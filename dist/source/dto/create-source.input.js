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
exports.CreateSourceInput = void 0;
const graphql_1 = require("@nestjs/graphql");
const class_validator_1 = require("class-validator");
const TypeSource_1 = require("../enums/TypeSource");
let CreateSourceInput = class CreateSourceInput {
    nom;
    url;
    type;
    fiable;
    logoUrl;
    pays;
    langue;
};
exports.CreateSourceInput = CreateSourceInput;
__decorate([
    (0, graphql_1.Field)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateSourceInput.prototype, "nom", void 0);
__decorate([
    (0, graphql_1.Field)(),
    (0, class_validator_1.IsUrl)(),
    __metadata("design:type", String)
], CreateSourceInput.prototype, "url", void 0);
__decorate([
    (0, graphql_1.Field)(() => TypeSource_1.TypeSource),
    (0, class_validator_1.IsEnum)(TypeSource_1.TypeSource),
    __metadata("design:type", String)
], CreateSourceInput.prototype, "type", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], CreateSourceInput.prototype, "fiable", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsUrl)(),
    __metadata("design:type", String)
], CreateSourceInput.prototype, "logoUrl", void 0);
__decorate([
    (0, graphql_1.Field)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateSourceInput.prototype, "pays", void 0);
__decorate([
    (0, graphql_1.Field)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateSourceInput.prototype, "langue", void 0);
exports.CreateSourceInput = CreateSourceInput = __decorate([
    (0, graphql_1.InputType)()
], CreateSourceInput);
//# sourceMappingURL=create-source.input.js.map