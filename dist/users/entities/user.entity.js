"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const graphql_1 = require("@nestjs/graphql");
const typeorm_1 = require("typeorm");
const article_entity_1 = require("../../articles/entities/article.entity");
const chatbot_ai_entity_1 = require("../../chatbot-ai/entities/chatbot-ai.entity");
const media_entity_1 = require("../../medias/entities/media.entity");
const revision_entity_1 = require("../../revision/entities/revision.entity");
const role_entity_1 = require("../../role/entities/role.entity");
const notification_entity_1 = require("../../notifications/entities/notification.entity");
let User = class User {
    id;
    nom;
    prenom;
    email;
    motDePasse;
    statut;
    dateCreation;
    role;
    notifications;
    revisions;
    articles;
    medias;
    analyses;
};
exports.User = User;
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Int),
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], User.prototype, "id", void 0);
__decorate([
    (0, graphql_1.Field)(),
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], User.prototype, "nom", void 0);
__decorate([
    (0, graphql_1.Field)(),
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], User.prototype, "prenom", void 0);
__decorate([
    (0, graphql_1.Field)(),
    (0, typeorm_1.Column)({ unique: true }),
    __metadata("design:type", String)
], User.prototype, "email", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], User.prototype, "motDePasse", void 0);
__decorate([
    (0, graphql_1.Field)(),
    (0, typeorm_1.Column)({ default: 'ACTIF' }),
    __metadata("design:type", String)
], User.prototype, "statut", void 0);
__decorate([
    (0, graphql_1.Field)(),
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], User.prototype, "dateCreation", void 0);
__decorate([
    (0, graphql_1.Field)(() => role_entity_1.Role),
    (0, typeorm_1.ManyToOne)(() => role_entity_1.Role, (role) => role.users),
    __metadata("design:type", role_entity_1.Role)
], User.prototype, "role", void 0);
__decorate([
    (0, graphql_1.Field)(() => [notification_entity_1.Notification]),
    (0, typeorm_1.OneToMany)(() => notification_entity_1.Notification, (notification) => notification.user),
    __metadata("design:type", Array)
], User.prototype, "notifications", void 0);
__decorate([
    (0, graphql_1.Field)(() => [revision_entity_1.Revision]),
    (0, typeorm_1.OneToMany)(() => revision_entity_1.Revision, (revision) => revision.user),
    __metadata("design:type", Array)
], User.prototype, "revisions", void 0);
__decorate([
    (0, graphql_1.Field)(() => [article_entity_1.Article]),
    (0, typeorm_1.OneToMany)(() => article_entity_1.Article, (article) => article.auteur),
    __metadata("design:type", Array)
], User.prototype, "articles", void 0);
__decorate([
    (0, graphql_1.Field)(() => [media_entity_1.Media]),
    (0, typeorm_1.OneToMany)(() => media_entity_1.Media, (media) => media.user),
    __metadata("design:type", Array)
], User.prototype, "medias", void 0);
__decorate([
    (0, graphql_1.Field)(() => [chatbot_ai_entity_1.ChatbotAi]),
    (0, typeorm_1.OneToMany)(() => chatbot_ai_entity_1.ChatbotAi, (chatbotAi) => chatbotAi.user),
    __metadata("design:type", Array)
], User.prototype, "analyses", void 0);
exports.User = User = __decorate([
    (0, graphql_1.ObjectType)(),
    (0, typeorm_1.Entity)('users')
], User);
//# sourceMappingURL=user.entity.js.map