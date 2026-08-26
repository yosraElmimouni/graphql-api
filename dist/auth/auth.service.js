"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const config_1 = require("@nestjs/config");
const bcrypt = __importStar(require("bcrypt"));
const crypto = __importStar(require("crypto"));
const jwt = __importStar(require("jsonwebtoken"));
const jwks_rsa_1 = __importDefault(require("jwks-rsa"));
const users_service_1 = require("../users/users.service");
const role_service_1 = require("../role/role.service");
const Roles_1 = require("../role/enums/Roles");
const azure_ad_config_1 = require("./azure-ad.config");
const DEFAULT_MICROSOFT_ROLE = Roles_1.Roles.ADMIN;
let AuthService = class AuthService {
    usersService;
    roleService;
    jwtService;
    configService;
    azureTenantId;
    azureClientId;
    jwks;
    constructor(usersService, roleService, jwtService, configService) {
        this.usersService = usersService;
        this.roleService = roleService;
        this.jwtService = jwtService;
        this.configService = configService;
        const tenantId = this.configService.get('AZURE_TENANT_ID');
        const clientId = this.configService.get('AZURE_CLIENT_ID');
        if (!tenantId || !clientId) {
            throw new Error("AZURE_TENANT_ID / AZURE_CLIENT_ID manquants dans les variables d'environnement");
        }
        this.azureTenantId = tenantId;
        this.azureClientId = clientId;
        this.jwks = (0, jwks_rsa_1.default)({
            jwksUri: azure_ad_config_1.azureAdUrls.jwksUri(this.azureTenantId),
            cache: true,
            rateLimit: true,
        });
    }
    async validateUser(email, motDePasse) {
        const user = await this.usersService.findByEmail(email);
        if (!user) {
            throw new common_1.UnauthorizedException('Identifiants invalides');
        }
        const match = await bcrypt.compare(motDePasse, user.motDePasse);
        if (!match) {
            throw new common_1.UnauthorizedException('Identifiants invalides');
        }
        return user;
    }
    async login(email, motDePasse) {
        const user = await this.validateUser(email, motDePasse);
        const payload = { sub: user.id, email: user.email, role: user.role?.id };
        return {
            accessToken: this.jwtService.sign(payload),
            user,
        };
    }
    async verifyMicrosoftToken(idToken) {
        const getKey = (header, callback) => {
            this.jwks.getSigningKey(header.kid, (err, key) => {
                if (err || !key) {
                    callback(err ?? new Error('Clé de signature introuvable'));
                    return;
                }
                callback(null, key.getPublicKey());
            });
        };
        return new Promise((resolve, reject) => {
            jwt.verify(idToken, getKey, {
                audience: this.azureClientId,
                issuer: azure_ad_config_1.azureAdUrls.issuer(this.azureTenantId),
                algorithms: ['RS256'],
            }, (err, decoded) => {
                if (err || !decoded || typeof decoded === 'string') {
                    console.error('[Microsoft login] vérification du token échouée :', err);
                    reject(new common_1.UnauthorizedException('Token Microsoft invalide'));
                    return;
                }
                resolve(decoded);
            });
        });
    }
    async loginWithMicrosoft(idToken) {
        const claims = await this.verifyMicrosoftToken(idToken);
        const email = claims.email ?? claims.preferred_username;
        if (!email) {
            throw new common_1.UnauthorizedException("Le token Microsoft ne contient pas d'email exploitable");
        }
        let user = await this.usersService.findByEmail(email);
        if (!user) {
            const defaultRole = await this.roleService.findByNomRole(DEFAULT_MICROSOFT_ROLE);
            const randomPassword = crypto.randomBytes(32).toString('hex');
            user = await this.usersService.create({
                nom: claims.family_name ?? 'Inconnu',
                prenom: claims.given_name ?? 'Inconnu',
                email,
                motDePasse: randomPassword,
                roleId: defaultRole.id,
                statut: 'ACTIF',
            });
            console.log(`[Microsoft login] Nouveau compte Newsroom auto-provisionné pour ${email} (rôle ${DEFAULT_MICROSOFT_ROLE})`);
        }
        const payload = { sub: user.id, email: user.email, role: user.role?.id };
        return {
            accessToken: this.jwtService.sign(payload),
            user,
        };
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [users_service_1.UsersService,
        role_service_1.RoleService,
        jwt_1.JwtService,
        config_1.ConfigService])
], AuthService);
//# sourceMappingURL=auth.service.js.map