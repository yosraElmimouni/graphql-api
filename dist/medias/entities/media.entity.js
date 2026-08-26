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
exports.Media = void 0;
const graphql_1 = require("@nestjs/graphql");
const typeorm_1 = require("typeorm");
const article_entity_1 = require("../../articles/entities/article.entity");
const user_entity_1 = require("../../users/entities/user.entity");
const MediaType_1 = require("../Enums/MediaType");
(0, graphql_1.registerEnumType)(MediaType_1.MediaType, { name: 'MediaType' });
let Media = class Media {
    id;
    type;
    urlFichier;
    titre;
    description;
    localisation;
    dateCapture;
    article;
    user;
};
exports.Media = Media;
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Int),
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Media.prototype, "id", void 0);
__decorate([
    (0, graphql_1.Field)(() => MediaType_1.MediaType),
    (0, typeorm_1.Column)({ type: 'enum', enum: MediaType_1.MediaType }),
    __metadata("design:type", String)
], Media.prototype, "type", void 0);
__decorate([
    (0, graphql_1.Field)(),
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Media.prototype, "urlFichier", void 0);
__decorate([
    (0, graphql_1.Field)(),
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Media.prototype, "titre", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Media.prototype, "description", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Media.prototype, "localisation", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    (0, typeorm_1.Column)({ type: 'timestamp', nullable: true }),
    __metadata("design:type", Date)
], Media.prototype, "dateCapture", void 0);
__decorate([
    (0, graphql_1.Field)(() => article_entity_1.Article),
    (0, typeorm_1.ManyToOne)(() => article_entity_1.Article, (article) => article.medias),
    __metadata("design:type", article_entity_1.Article)
], Media.prototype, "article", void 0);
__decorate([
    (0, graphql_1.Field)(() => user_entity_1.User),
    (0, typeorm_1.ManyToOne)(() => user_entity_1.User, (user) => user.medias),
    __metadata("design:type", user_entity_1.User)
], Media.prototype, "user", void 0);
exports.Media = Media = __decorate([
    (0, graphql_1.ObjectType)(),
    (0, typeorm_1.Entity)('medias')
], Media);
//# sourceMappingURL=media.entity.js.map