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
exports.CreateRoleInput = void 0;
const graphql_1 = require("@nestjs/graphql");
const class_validator_1 = require("class-validator");
const Roles_1 = require("../enums/Roles");
let CreateRoleInput = class CreateRoleInput {
    nomRole;
};
exports.CreateRoleInput = CreateRoleInput;
__decorate([
    (0, graphql_1.Field)(() => Roles_1.Roles),
    (0, class_validator_1.IsEnum)(Roles_1.Roles),
    __metadata("design:type", String)
], CreateRoleInput.prototype, "nomRole", void 0);
exports.CreateRoleInput = CreateRoleInput = __decorate([
    (0, graphql_1.InputType)()
], CreateRoleInput);
//# sourceMappingURL=create-role.input.js.map