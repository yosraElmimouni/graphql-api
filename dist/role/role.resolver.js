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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RoleResolver = void 0;
const graphql_1 = require("@nestjs/graphql");
const common_1 = require("@nestjs/common");
const role_service_1 = require("./role.service");
const role_entity_1 = require("./entities/role.entity");
const create_role_input_1 = require("./dto/create-role.input");
const update_role_input_1 = require("./dto/update-role.input");
const gql_auth_guard_1 = require("../auth/guards/gql-auth.guard");
let RoleResolver = class RoleResolver {
    roleService;
    constructor(roleService) {
        this.roleService = roleService;
    }
    createRole(createRoleInput) {
        return this.roleService.create(createRoleInput);
    }
    findAll() {
        return this.roleService.findAll();
    }
    findOne(id) {
        return this.roleService.findOne(id);
    }
    updateRole(updateRoleInput) {
        return this.roleService.update(updateRoleInput.id, updateRoleInput);
    }
    removeRole(id) {
        return this.roleService.remove(id);
    }
};
exports.RoleResolver = RoleResolver;
__decorate([
    (0, graphql_1.Mutation)(() => role_entity_1.Role),
    __param(0, (0, graphql_1.Args)('createRoleInput')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_role_input_1.CreateRoleInput]),
    __metadata("design:returntype", void 0)
], RoleResolver.prototype, "createRole", null);
__decorate([
    (0, graphql_1.Query)(() => [role_entity_1.Role], { name: 'roles' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], RoleResolver.prototype, "findAll", null);
__decorate([
    (0, graphql_1.Query)(() => role_entity_1.Role, { name: 'role' }),
    __param(0, (0, graphql_1.Args)('id', { type: () => graphql_1.Int })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], RoleResolver.prototype, "findOne", null);
__decorate([
    (0, graphql_1.Mutation)(() => role_entity_1.Role),
    __param(0, (0, graphql_1.Args)('updateRoleInput')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [update_role_input_1.UpdateRoleInput]),
    __metadata("design:returntype", void 0)
], RoleResolver.prototype, "updateRole", null);
__decorate([
    (0, graphql_1.Mutation)(() => role_entity_1.Role),
    __param(0, (0, graphql_1.Args)('id', { type: () => graphql_1.Int })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], RoleResolver.prototype, "removeRole", null);
exports.RoleResolver = RoleResolver = __decorate([
    (0, graphql_1.Resolver)(() => role_entity_1.Role),
    (0, common_1.UseGuards)(gql_auth_guard_1.GqlAuthGuard),
    __metadata("design:paramtypes", [role_service_1.RoleService])
], RoleResolver);
//# sourceMappingURL=role.resolver.js.map