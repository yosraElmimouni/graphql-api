import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import helmet from 'helmet';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // En-têtes de sécurité HTTP (CSP désactivée : incompatible avec le
  // playground GraphQL en développement ; à activer explicitement en prod
  // si besoin avec une politique adaptée).
  app.use(
    helmet({
      contentSecurityPolicy: false,
    }),
  );

  // CORS restreint aux origines autorisées (FRONTEND_URL, séparées par
  // des virgules pour supporter plusieurs environnements).
  const allowedOrigins = (process.env.FRONTEND_URL ?? 'http://localhost:4200')
    .split(',')
    .map((origin) => origin.trim());
  app.enableCors({
    origin: allowedOrigins,
    credentials: true,
  });

  // Nécessaire pour que les décorateurs class-validator (ex: LoginInput)
  // soient réellement appliqués sur les arguments GraphQL.
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
