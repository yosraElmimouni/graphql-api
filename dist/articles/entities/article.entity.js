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
exports.Article = void 0;
const graphql_1 = require("@nestjs/graphql");
const typeorm_1 = require("typeorm");
const media_entity_1 = require("../../medias/entities/media.entity");
const news_item_entity_1 = require("../../news-item/entities/news-item.entity");
const revision_entity_1 = require("../../revision/entities/revision.entity");
const user_entity_1 = require("../../users/entities/user.entity");
const ArticleStatus_1 = require("../enums/ArticleStatus");
const CategorieArticle_1 = require("../enums/CategorieArticle");
(0, graphql_1.registerEnumType)(ArticleStatus_1.ArticleStatus, { name: 'ArticleStatus' });
(0, graphql_1.registerEnumType)(CategorieArticle_1.CategorieArticle, { name: 'CategorieArticle' });
let Article = class Article {
    id;
    titre;
    contenu;
    statut;
    categorie;
    dateCreation;
    dateModification;
    datePublication;
    tags;
    auteur;
    medias;
    revisions;
    newsItems;
};
exports.Article = Article;
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Int),
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Article.prototype, "id", void 0);
__decorate([
    (0, graphql_1.Field)(),
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Article.prototype, "titre", void 0);
__decorate([
    (0, graphql_1.Field)(),
    (0, typeorm_1.Column)('text'),
    __metadata("design:type", String)
], Article.prototype, "contenu", void 0);
__decorate([
    (0, graphql_1.Field)(() => ArticleStatus_1.ArticleStatus),
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: ArticleStatus_1.ArticleStatus,
        default: ArticleStatus_1.ArticleStatus.Brouillon,
    }),
    __metadata("design:type", String)
], Article.prototype, "statut", void 0);
__decorate([
    (0, graphql_1.Field)(() => CategorieArticle_1.CategorieArticle, { nullable: true }),
    (0, typeorm_1.Column)({ type: 'enum', enum: CategorieArticle_1.CategorieArticle, nullable: true }),
    __metadata("design:type", String)
], Article.prototype, "categorie", void 0);
__decorate([
    (0, graphql_1.Field)(),
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], Article.prototype, "dateCreation", void 0);
__decorate([
    (0, graphql_1.Field)(),
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], Article.prototype, "dateModification", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    (0, typeorm_1.Column)({ type: 'timestamp', nullable: true }),
    __metadata("design:type", Date)
], Article.prototype, "datePublication", void 0);
__decorate([
    (0, graphql_1.Field)(() => [String], { nullable: true }),
    (0, typeorm_1.Column)('text', { array: true, nullable: true }),
    __metadata("design:type", Array)
], Article.prototype, "tags", void 0);
__decorate([
    (0, graphql_1.Field)(() => user_entity_1.User),
    (0, typeorm_1.ManyToOne)(() => user_entity_1.User, (user) => user.articles),
    __metadata("design:type", user_entity_1.User)
], Article.prototype, "auteur", void 0);
__decorate([
    (0, graphql_1.Field)(() => [media_entity_1.Media]),
    (0, typeorm_1.OneToMany)(() => media_entity_1.Media, (media) => media.article),
    __metadata("design:type", Array)
], Article.prototype, "medias", void 0);
__decorate([
    (0, graphql_1.Field)(() => [revision_entity_1.Revision]),
    (0, typeorm_1.OneToMany)(() => revision_entity_1.Revision, (revision) => revision.article),
    __metadata("design:type", Array)
], Article.prototype, "revisions", void 0);
__decorate([
    (0, graphql_1.Field)(() => [news_item_entity_1.NewsItem]),
    (0, typeorm_1.ManyToMany)(() => news_item_entity_1.NewsItem, (newsItem) => newsItem.articles),
    (0, typeorm_1.JoinTable)(),
    __metadata("design:type", Array)
], Article.prototype, "newsItems", void 0);
exports.Article = Article = __decorate([
    (0, graphql_1.ObjectType)(),
    (0, typeorm_1.Entity)('articles')
], Article);
//# sourceMappingURL=article.entity.js.map