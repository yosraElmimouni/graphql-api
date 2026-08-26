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
exports.CreateNewsItemInput = void 0;
const graphql_1 = require("@nestjs/graphql");
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
const CategorieNews_1 = require("../eums/CategorieNews");
let CreateNewsItemInput = class CreateNewsItemInput {
    titre;
    contenu;
    categorie;
    url;
    datePublication;
    sourceId;
};
exports.CreateNewsItemInput = CreateNewsItemInput;
__decorate([
    (0, graphql_1.Field)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateNewsItemInput.prototype, "titre", void 0);
__decorate([
    (0, graphql_1.Field)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateNewsItemInput.prototype, "contenu", void 0);
__decorate([
    (0, graphql_1.Field)(() => CategorieNews_1.CategorieNews),
    (0, class_validator_1.IsEnum)(CategorieNews_1.CategorieNews),
    __metadata("design:type", String)
], CreateNewsItemInput.prototype, "categorie", void 0);
__decorate([
    (0, graphql_1.Field)(),
    (0, class_validator_1.IsUrl)(),
    __metadata("design:type", String)
], CreateNewsItemInput.prototype, "url", void 0);
__decorate([
    (0, graphql_1.Field)(),
    (0, class_transformer_1.Type)(() => Date),
    (0, class_validator_1.IsDate)(),
    __metadata("design:type", Date)
], CreateNewsItemInput.prototype, "datePublication", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Int),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.IsPositive)(),
    __metadata("design:type", Number)
], CreateNewsItemInput.prototype, "sourceId", void 0);
exports.CreateNewsItemInput = CreateNewsItemInput = __decorate([
    (0, graphql_1.InputType)()
], CreateNewsItemInput);
//# sourceMappingURL=create-news-item.input.js.map