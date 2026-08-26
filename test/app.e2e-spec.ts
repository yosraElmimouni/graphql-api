import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { ConfigModule } from '@nestjs/config';
import { getRepositoryToken } from '@nestjs/typeorm';
import { join } from 'path';
import * as bcrypt from 'bcrypt';
import request from 'supertest';
import { App } from 'supertest/types';

import { AuthModule } from '../src/auth/auth.module';
import { UsersModule } from '../src/users/users.module';
import { User } from '../src/users/entities/user.entity';

// Secrets de test indépendants du .env local (non commité, absent en CI).
process.env.JWT_SECRET = 'test-secret-e2e';
process.env.JWT_EXPIRES_IN = '1h';

type MockRepo = Record<string, jest.Mock>;

const createMockRepository = (): MockRepo => ({
  create: jest.fn((entity) => entity),
  save: jest.fn(),
  find: jest.fn(),
  findOne: jest.fn(),
  update: jest.fn(),
  remove: jest.fn(),
});

describe('GraphQL API (e2e)', () => {
  let app: INestApplication<App>;
  let usersRepo: MockRepo;

  const plainPassword = 'motdepasse123';
  let mockUser: any;

  beforeAll(async () => {
    usersRepo = createMockRepository();
    mockUser = {
      id: 1,
      nom: 'Doe',
      prenom: 'Jane',
      email: 'jane@example.com',
      motDePasse: await bcrypt.hash(plainPassword, 10),
      statut: 'actif',
      role: { id: 1, nomRole: 'ADMIN' },
    };

    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot({ isGlobal: true, ignoreEnvFile: true }),
        GraphQLModule.forRoot<ApolloDriverConfig>({
          driver: ApolloDriver,
          autoSchemaFile: join(process.cwd(), 'test', 'schema-e2e.gql'),
          context: ({ req }: { req: unknown }) => ({ req }),
        }),
        AuthModule,
        UsersModule,
      ],
    })
      .overrideProvider(getRepositoryToken(User))
      .useValue(usersRepo)
      .compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  const gql = (query: string, variables?: Record<string, unknown>) =>
    request(app.getHttpServer() as App)
      .post('/graphql')
      .send({ query, variables });

  describe('login', () => {
    it('renvoie un accessToken pour des identifiants valides', async () => {
      usersRepo.findOne.mockResolvedValueOnce(mockUser);

      const res = await gql(
        `mutation Login($input: LoginInput!) {
           login(loginInput: $input) {
             accessToken
             user { id email }
           }
         }`,
        { input: { email: mockUser.email, motDePasse: plainPassword } },
      );

      expect(res.status).toBe(200);
      expect(res.body.errors).toBeUndefined();
      expect(typeof res.body.data.login.accessToken).toBe('string');
      expect(res.body.data.login.user.email).toBe(mockUser.email);
    });

    it('rejette un mot de passe incorrect', async () => {
      usersRepo.findOne.mockResolvedValueOnce(mockUser);

      const res = await gql(
        `mutation Login($input: LoginInput!) {
           login(loginInput: $input) { accessToken }
         }`,
        { input: { email: mockUser.email, motDePasse: 'mauvais-mot-de-passe' } },
      );

      expect(res.body.data?.login).toBeFalsy();
      expect(res.body.errors).toBeDefined();
    });

    it('rejette un email absent en base', async () => {
      usersRepo.findOne.mockResolvedValueOnce(null);

      const res = await gql(
        `mutation Login($input: LoginInput!) {
           login(loginInput: $input) { accessToken }
         }`,
        { input: { email: 'inconnu@example.com', motDePasse: plainPassword } },
      );

      expect(res.body.data?.login).toBeFalsy();
      expect(res.body.errors).toBeDefined();
    });

    it('rejette un email mal formé (validation du DTO)', async () => {
      const res = await gql(
        `mutation Login($input: LoginInput!) {
           login(loginInput: $input) { accessToken }
         }`,
        { input: { email: 'pas-un-email', motDePasse: plainPassword } },
      );

      expect(res.body.errors).toBeDefined();
      expect(usersRepo.findOne).not.toHaveBeenCalledWith(
        expect.objectContaining({ where: { email: 'pas-un-email' } }),
      );
    });
  });

  describe('protection des routes par GqlAuthGuard', () => {
    it("refuse l'accès à `users` sans token", async () => {
      const res = await gql(`query { users { id email } }`);

      expect(res.body.data?.users).toBeFalsy();
      expect(res.body.errors).toBeDefined();
    });

    it('refuse un token invalide', async () => {
      const res = await request(app.getHttpServer() as App)
        .post('/graphql')
        .set('Authorization', 'Bearer token.invalide.xxx')
        .send({ query: `query { users { id email } }` });

      expect(res.body.data?.users).toBeFalsy();
      expect(res.body.errors).toBeDefined();
    });

    it("autorise l'accès à `users` avec un token valide", async () => {
      usersRepo.findOne.mockResolvedValueOnce(mockUser);
      const loginRes = await gql(
        `mutation Login($input: LoginInput!) {
           login(loginInput: $input) { accessToken }
         }`,
        { input: { email: mockUser.email, motDePasse: plainPassword } },
      );
      const token = loginRes.body.data.login.accessToken;

      usersRepo.find.mockResolvedValueOnce([mockUser]);

      const res = await request(app.getHttpServer() as App)
        .post('/graphql')
        .set('Authorization', `Bearer ${token}`)
        .send({ query: `query { users { id email } }` });

      expect(res.body.errors).toBeUndefined();
      expect(res.body.data.users).toEqual([
        { id: mockUser.id, email: mockUser.email },
      ]);
    });
  });
});
