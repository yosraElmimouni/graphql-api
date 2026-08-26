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
exports.Source = void 0;
const graphql_1 = require("@nestjs/graphql");
const typeorm_1 = require("typeorm");
const news_item_entity_1 = require("../../news-item/entities/news-item.entity");
const TypeSource_1 = require("../enums/TypeSource");
(0, graphql_1.registerEnumType)(TypeSource_1.TypeSource, { name: 'TypeSource' });
let Source = class Source {
    id;
    nom;
    url;
    type;
    fiable;
    logoUrl;
    pays;
    langue;
    dateCreation;
    newsItems;
};
exports.Source = Source;
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Int),
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Source.prototype, "id", void 0);
__decorate([
    (0, graphql_1.Field)(),
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Source.prototype, "nom", void 0);
__decorate([
    (0, graphql_1.Field)(),
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Source.prototype, "url", void 0);
__decorate([
    (0, graphql_1.Field)(() => TypeSource_1.TypeSource),
    (0, typeorm_1.Column)({ type: 'enum', enum: TypeSource_1.TypeSource }),
    __metadata("design:type", String)
], Source.prototype, "type", void 0);
__decorate([
    (0, graphql_1.Field)(),
    (0, typeorm_1.Column)({ default: false }),
    __metadata("design:type", Boolean)
], Source.prototype, "fiable", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Source.prototype, "logoUrl", void 0);
__decorate([
    (0, graphql_1.Field)(),
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Source.prototype, "pays", void 0);
__decorate([
    (0, graphql_1.Field)(),
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Source.prototype, "langue", void 0);
__decorate([
    (0, graphql_1.Field)(),
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], Source.prototype, "dateCreation", void 0);
__decorate([
    (0, graphql_1.Field)(() => [news_item_entity_1.NewsItem]),
    (0, typeorm_1.OneToMany)(() => news_item_entity_1.NewsItem, (newsItem) => newsItem.source),
    __metadata("design:type", Array)
], Source.prototype, "newsItems", void 0);
exports.Source = Source = __decorate([
    (0, graphql_1.ObjectType)(),
    (0, typeorm_1.Entity)('sources')
], Source);
//# sourceMappingURL=source.entity.js.map