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
exports.RevisionResolver = void 0;
const graphql_1 = require("@nestjs/graphql");
const common_1 = require("@nestjs/common");
const revision_service_1 = require("./revision.service");
const revision_entity_1 = require("./entities/revision.entity");
const create_revision_input_1 = require("./dto/create-revision.input");
const update_revision_input_1 = require("./dto/update-revision.input");
const gql_auth_guard_1 = require("../auth/guards/gql-auth.guard");
let RevisionResolver = class RevisionResolver {
    revisionService;
    constructor(revisionService) {
        this.revisionService = revisionService;
    }
    createRevision(createRevisionInput) {
        return this.revisionService.create(createRevisionInput);
    }
    findAll() {
        return this.revisionService.findAll();
    }
    findOne(id) {
        return this.revisionService.findOne(id);
    }
    updateRevision(updateRevisionInput) {
        return this.revisionService.update(updateRevisionInput.id, updateRevisionInput);
    }
    removeRevision(id) {
        return this.revisionService.remove(id);
    }
};
exports.RevisionResolver = RevisionResolver;
__decorate([
    (0, graphql_1.Mutation)(() => revision_entity_1.Revision),
    __param(0, (0, graphql_1.Args)('createRevisionInput')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_revision_input_1.CreateRevisionInput]),
    __metadata("design:returntype", void 0)
], RevisionResolver.prototype, "createRevision", null);
__decorate([
    (0, graphql_1.Query)(() => [revision_entity_1.Revision], { name: 'revisions' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], RevisionResolver.prototype, "findAll", null);
__decorate([
    (0, graphql_1.Query)(() => revision_entity_1.Revision, { name: 'revision' }),
    __param(0, (0, graphql_1.Args)('id', { type: () => graphql_1.Int })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], RevisionResolver.prototype, "findOne", null);
__decorate([
    (0, graphql_1.Mutation)(() => revision_entity_1.Revision),
    __param(0, (0, graphql_1.Args)('updateRevisionInput')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [update_revision_input_1.UpdateRevisionInput]),
    __metadata("design:returntype", void 0)
], RevisionResolver.prototype, "updateRevision", null);
__decorate([
    (0, graphql_1.Mutation)(() => revision_entity_1.Revision),
    __param(0, (0, graphql_1.Args)('id', { type: () => graphql_1.Int })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], RevisionResolver.prototype, "removeRevision", null);
exports.RevisionResolver = RevisionResolver = __decorate([
    (0, graphql_1.Resolver)(() => revision_entity_1.Revision),
    (0, common_1.UseGuards)(gql_auth_guard_1.GqlAuthGuard),
    __metadata("design:paramtypes", [revision_service_1.RevisionService])
], RevisionResolver);
//# sourceMappingURL=revision.resolver.js.map