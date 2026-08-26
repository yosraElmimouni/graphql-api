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
exports.Revision = void 0;
const graphql_1 = require("@nestjs/graphql");
const typeorm_1 = require("typeorm");
const article_entity_1 = require("../../articles/entities/article.entity");
const user_entity_1 = require("../../users/entities/user.entity");
let Revision = class Revision {
    id;
    dateRevision;
    commentaire;
    user;
    article;
};
exports.Revision = Revision;
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Int),
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Revision.prototype, "id", void 0);
__decorate([
    (0, graphql_1.Field)(),
    (0, typeorm_1.Column)({ type: 'timestamp' }),
    __metadata("design:type", Date)
], Revision.prototype, "dateRevision", void 0);
__decorate([
    (0, graphql_1.Field)(),
    (0, typeorm_1.Column)('text'),
    __metadata("design:type", String)
], Revision.prototype, "commentaire", void 0);
__decorate([
    (0, graphql_1.Field)(() => user_entity_1.User),
    (0, typeorm_1.ManyToOne)(() => user_entity_1.User, (user) => user.revisions),
    __metadata("design:type", user_entity_1.User)
], Revision.prototype, "user", void 0);
__decorate([
    (0, graphql_1.Field)(() => article_entity_1.Article),
    (0, typeorm_1.ManyToOne)(() => article_entity_1.Article, (article) => article.revisions),
    __metadata("design:type", article_entity_1.Article)
], Revision.prototype, "article", void 0);
exports.Revision = Revision = __decorate([
    (0, graphql_1.ObjectType)(),
    (0, typeorm_1.Entity)('revisions')
], Revision);
//# sourceMappingURL=revision.entity.js.map