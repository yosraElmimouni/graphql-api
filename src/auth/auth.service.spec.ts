import { UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { AuthService } from './auth.service';

describe('AuthService', () => {
  let authService: AuthService;
  let usersService: { findByEmail: jest.Mock };
  let jwtService: { sign: jest.Mock };

  beforeEach(() => {
    usersService = { findByEmail: jest.fn() };
    jwtService = { sign: jest.fn().mockReturnValue('signed-jwt') };
    authService = new AuthService(usersService as any, jwtService as any);
  });

  it('rejette un email inconnu', async () => {
    usersService.findByEmail.mockResolvedValue(null);
    await expect(
      authService.validateUser('inconnu@test.com', 'x'),
    ).rejects.toThrow(UnauthorizedException);
  });

  it('rejette un mauvais mot de passe', async () => {
    const hashed = await bcrypt.hash('bonMotDePasse', 10);
    usersService.findByEmail.mockResolvedValue({
      id: 1,
      email: 'a@test.com',
      motDePasse: hashed,
    });
    await expect(
      authService.validateUser('a@test.com', 'mauvais'),
    ).rejects.toThrow(UnauthorizedException);
  });

  it('retourne un accessToken pour des identifiants valides', async () => {
    const hashed = await bcrypt.hash('bonMotDePasse', 10);
    usersService.findByEmail.mockResolvedValue({
      id: 1,
      email: 'a@test.com',
      motDePasse: hashed,
      role: { id: 2 },
    });
    const result = await authService.login('a@test.com', 'bonMotDePasse');
    expect(result.accessToken).toBe('signed-jwt');
    expect(jwtService.sign).toHaveBeenCalledWith({
      sub: 1,
      email: 'a@test.com',
      role: 2,
    });
  });
});
