"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const graphql_1 = require("@nestjs/graphql");
const apollo_1 = require("@nestjs/apollo");
const config_1 = require("@nestjs/config");
const typeorm_1 = require("@nestjs/typeorm");
const schedule_1 = require("@nestjs/schedule");
const path_1 = require("path");
const agenda_module_1 = require("./agenda/agenda.module");
const auth_module_1 = require("./auth/auth.module");
const articles_module_1 = require("./articles/articles.module");
const chatbot_ai_module_1 = require("./chatbot-ai/chatbot-ai.module");
const medias_module_1 = require("./medias/medias.module");
const news_item_module_1 = require("./news-item/news-item.module");
const notifications_module_1 = require("./notifications/notifications.module");
const revision_module_1 = require("./revision/revision.module");
const role_module_1 = require("./role/role.module");
const source_module_1 = require("./source/source.module");
const users_module_1 = require("./users/users.module");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({ isGlobal: true }),
            typeorm_1.TypeOrmModule.forRootAsync({
                imports: [config_1.ConfigModule],
                inject: [config_1.ConfigService],
                useFactory: (configService) => {
                    const url = configService.get('DATABASE_URL');
                    const config = {
                        name: 'default',
                        type: 'postgres',
                        entities: [(0, path_1.join)(__dirname, '**', '*.entity.{ts,js}')],
                        synchronize: process.env.NODE_ENV !== 'production',
                    };
                    if (url) {
                        config.url = url;
                        if (url.includes('neon.tech') || url.includes('render.com')) {
                            config.ssl = { rejectUnauthorized: false };
                        }
                    }
                    else {
                        config.host = configService.get('DB_HOST') || 'localhost';
                        config.port = parseInt(configService.get('DB_PORT') || '5432');
                        config.username = configService.get('DB_USERNAME');
                        config.password = configService.get('DB_PASSWORD');
                        config.database = configService.get('DB_NAME');
                    }
                    return config;
                },
            }),
            typeorm_1.TypeOrmModule.forRootAsync({
                name: 'backup',
                imports: [config_1.ConfigModule],
                inject: [config_1.ConfigService],
                useFactory: (configService) => {
                    const backupUrl = configService.get('BACKUP_DATABASE_URL');
                    const config = {
                        type: 'postgres',
                        entities: [(0, path_1.join)(__dirname, '**', '*.entity.{ts,js}')],
                        synchronize: process.env.NODE_ENV !== 'production',
                    };
                    if (backupUrl) {
                        config.url = backupUrl;
                        if (backupUrl.includes('neon.tech') ||
                            backupUrl.includes('render.com')) {
                            config.ssl = { rejectUnauthorized: false };
                        }
                    }
                    else {
                        config.host = configService.get('DB_HOST') || 'localhost';
                        config.port = parseInt(configService.get('DB_PORT') || '5432');
                        config.username = configService.get('DB_USERNAME');
                        config.password = configService.get('DB_PASSWORD');
                        config.database = configService.get('DB_NAME') + '_backup';
                    }
                    return config;
                },
            }),
            schedule_1.ScheduleModule.forRoot(),
            graphql_1.GraphQLModule.forRoot({
                driver: apollo_1.ApolloDriver,
                autoSchemaFile: (0, path_1.join)(process.cwd(), 'src/schema.gql'),
                context: ({ req }) => ({ req }),
                introspection: process.env.NODE_ENV !== 'production',
                playground: process.env.NODE_ENV !== 'production',
            }),
            users_module_1.UsersModule,
            auth_module_1.AuthModule,
            agenda_module_1.AgendaModule,
            articles_module_1.ArticlesModule,
            chatbot_ai_module_1.ChatbotAiModule,
            medias_module_1.MediasModule,
            news_item_module_1.NewsItemModule,
            notifications_module_1.NotificationsModule,
            revision_module_1.RevisionModule,
            role_module_1.RoleModule,
            source_module_1.SourceModule,
        ],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map