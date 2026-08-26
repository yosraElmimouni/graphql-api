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
exports.UpdateArticleInput = void 0;
const class_validator_1 = require("class-validator");
const create_article_input_1 = require("./create-article.input");
const graphql_1 = require("@nestjs/graphql");
const class_transformer_1 = require("class-transformer");
let UpdateArticleInput = class UpdateArticleInput extends (0, graphql_1.PartialType)((0, graphql_1.OmitType)(create_article_input_1.CreateArticleInput, ['auteurId'])) {
    id;
    datePublication;
};
exports.UpdateArticleInput = UpdateArticleInput;
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Int),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.IsPositive)(),
    __metadata("design:type", Number)
], UpdateArticleInput.prototype, "id", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Type)(() => Date),
    (0, class_validator_1.IsDate)(),
    __metadata("design:type", Date)
], UpdateArticleInput.prototype, "datePublication", void 0);
exports.UpdateArticleInput = UpdateArticleInput = __decorate([
    (0, graphql_1.InputType)()
], UpdateArticleInput);
//# sourceMappingURL=update-article.input.js.map