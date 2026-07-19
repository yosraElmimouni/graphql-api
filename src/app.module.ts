import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ScheduleModule } from '@nestjs/schedule';
import { join } from 'path';
import { AgendaModule } from './agenda/agenda.module';
import { ArticlesModule } from './articles/articles.module';
import { ChatbotAiModule } from './chatbot-ai/chatbot-ai.module';
import { MediasModule } from './medias/medias.module';
import { NewsItemModule } from './news-item/news-item.module';
import { NotificationsModule } from './notifications/notifications.module';
import { RevisionModule } from './revision/revision.module';
import { RoleModule } from './role/role.module';
import { SourceModule } from './source/source.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),

    // Connexion principale
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        const url = configService.get<string>('DATABASE_URL');
        const config: any = {
          name: 'default',
          type: 'postgres',
          entities: [join(__dirname, '**', '*.entity.{ts,js}')],
          synchronize: true,
        };
        if (url) {
          config.url = url;
          if (url.includes('neon.tech') || url.includes('render.com')) {
            config.ssl = { rejectUnauthorized: false };
          }
        } else {
          config.host = configService.get('DB_HOST') || 'localhost';
          config.port = parseInt(configService.get('DB_PORT') || '5432');
          config.username = configService.get('DB_USERNAME');
          config.password = configService.get('DB_PASSWORD');
          config.database = configService.get('DB_NAME');
        }
        return config;
      },
    }),

    // Connexion de backup
    TypeOrmModule.forRootAsync({
      name: 'backup',
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        const backupUrl = configService.get<string>('BACKUP_DATABASE_URL');
        const config: any = {
          type: 'postgres',
          entities: [join(__dirname, '**', '*.entity.{ts,js}')],
          synchronize: true,
        };
        if (backupUrl) {
          config.url = backupUrl;
          if (
            backupUrl.includes('neon.tech') ||
            backupUrl.includes('render.com')
          ) {
            config.ssl = { rejectUnauthorized: false };
          }
        } else {
          config.host = configService.get('DB_HOST') || 'localhost';
          config.port = parseInt(configService.get('DB_PORT') || '5432');
          config.username = configService.get('DB_USERNAME');
          config.password = configService.get('DB_PASSWORD');
          config.database = configService.get('DB_NAME') + '_backup';
        }
        return config;
      },
    }),

    ScheduleModule.forRoot(),

    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
    }),

    UsersModule,
    AgendaModule,
    ArticlesModule,
    ChatbotAiModule,
    MediasModule,
    NewsItemModule,
    NotificationsModule,
    RevisionModule,
    RoleModule,
    SourceModule,
  ],
})
export class AppModule {}
