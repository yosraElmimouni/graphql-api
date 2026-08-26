import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import * as bcrypt from 'bcrypt';
import * as crypto from 'crypto';
import * as jwt from 'jsonwebtoken';
import jwksClient, { JwksClient } from 'jwks-rsa';
import { UsersService } from '../users/users.service';
import { RoleService } from '../role/role.service';
import { Roles } from '../role/enums/Roles';
import { User } from '../users/entities/user.entity';
import { azureAdUrls } from './azure-ad.config';

/** Rôle attribué par défaut aux comptes créés automatiquement via Microsoft. */
const DEFAULT_MICROSOFT_ROLE = Roles.ADMIN;

interface MicrosoftTokenClaims {
  oid: string;
  email?: string;
  preferred_username?: string;
  given_name?: string;
  family_name?: string;
  name?: string;
}

@Injectable()
export class AuthService {
  private readonly azureTenantId: string;
  private readonly azureClientId: string;
  private readonly jwks: JwksClient;

  constructor(
    private readonly usersService: UsersService,
    private readonly roleService: RoleService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {
    const tenantId = this.configService.get<string>('AZURE_TENANT_ID');
    const clientId = this.configService.get<string>('AZURE_CLIENT_ID');
    if (!tenantId || !clientId) {
      throw new Error(
        "AZURE_TENANT_ID / AZURE_CLIENT_ID manquants dans les variables d'environnement",
      );
    }
    this.azureTenantId = tenantId;
    this.azureClientId = clientId;

    this.jwks = jwksClient({
      jwksUri: azureAdUrls.jwksUri(this.azureTenantId),
      cache: true,
      rateLimit: true,
    });
  }

  async validateUser(email: string, motDePasse: string): Promise<User> {
    const user = await this.usersService.findByEmail(email);
    if (!user) {
      throw new UnauthorizedException('Identifiants invalides');
    }
    const match = await bcrypt.compare(motDePasse, user.motDePasse);
    if (!match) {
      throw new UnauthorizedException('Identifiants invalides');
    }
    return user;
  }

  async login(email: string, motDePasse: string) {
    const user = await this.validateUser(email, motDePasse);
    const payload = { sub: user.id, email: user.email, role: user.role?.id };
    return {
      accessToken: this.jwtService.sign(payload),
      user,
    };
  }

  private async verifyMicrosoftToken(
    idToken: string,
  ): Promise<MicrosoftTokenClaims> {
    const getKey: jwt.GetPublicKeyOrSecret = (header, callback) => {
      this.jwks.getSigningKey(header.kid, (err, key) => {
        if (err || !key) {
          callback(err ?? new Error('Clé de signature introuvable'));
          return;
        }
        callback(null, key.getPublicKey());
      });
    };

    return new Promise<MicrosoftTokenClaims>((resolve, reject) => {
      jwt.verify(
        idToken,
        getKey,
        {
          audience: this.azureClientId,
          issuer: azureAdUrls.issuer(this.azureTenantId),
          algorithms: ['RS256'],
        },
        (err, decoded) => {
          if (err || !decoded || typeof decoded === 'string') {
            console.error('[Microsoft login] vérification du token échouée :', err);
            reject(new UnauthorizedException('Token Microsoft invalide'));
            return;
          }
          resolve(decoded as unknown as MicrosoftTokenClaims);
        },
      );
    });
  }

  async loginWithMicrosoft(idToken: string) {
    const claims = await this.verifyMicrosoftToken(idToken);
    const email = claims.email ?? claims.preferred_username;
    if (!email) {
      throw new UnauthorizedException(
        "Le token Microsoft ne contient pas d'email exploitable",
      );
    }

    let user = await this.usersService.findByEmail(email);
    if (!user) {
      const defaultRole = await this.roleService.findByNomRole(
        DEFAULT_MICROSOFT_ROLE,
      );
      const randomPassword = crypto.randomBytes(32).toString('hex');
      user = await this.usersService.create({
  nom: claims.family_name ?? 'Inconnu',
  prenom: claims.given_name ?? 'Inconnu',
  email,
  motDePasse: randomPassword,
  roleId: defaultRole.id,
  statut: 'ACTIF',
});
      console.log(
        `[Microsoft login] Nouveau compte Newsroom auto-provisionné pour ${email} (rôle ${DEFAULT_MICROSOFT_ROLE})`,
      );
    }

    const payload = { sub: user.id, email: user.email, role: user.role?.id };
    return {
      accessToken: this.jwtService.sign(payload),
      user,
    };
  }
}