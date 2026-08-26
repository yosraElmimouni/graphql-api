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
exports.MediasResolver = void 0;
const graphql_1 = require("@nestjs/graphql");
const common_1 = require("@nestjs/common");
const medias_service_1 = require("./medias.service");
const media_entity_1 = require("./entities/media.entity");
const create_media_input_1 = require("./dto/create-media.input");
const update_media_input_1 = require("./dto/update-media.input");
const gql_auth_guard_1 = require("../auth/guards/gql-auth.guard");
let MediasResolver = class MediasResolver {
    mediasService;
    constructor(mediasService) {
        this.mediasService = mediasService;
    }
    createMedia(createMediaInput) {
        return this.mediasService.create(createMediaInput);
    }
    findAll() {
        return this.mediasService.findAll();
    }
    findOne(id) {
        return this.mediasService.findOne(id);
    }
    updateMedia(updateMediaInput) {
        return this.mediasService.update(updateMediaInput.id, updateMediaInput);
    }
    removeMedia(id) {
        return this.mediasService.remove(id);
    }
};
exports.MediasResolver = MediasResolver;
__decorate([
    (0, graphql_1.Mutation)(() => media_entity_1.Media),
    __param(0, (0, graphql_1.Args)('createMediaInput')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_media_input_1.CreateMediaInput]),
    __metadata("design:returntype", void 0)
], MediasResolver.prototype, "createMedia", null);
__decorate([
    (0, graphql_1.Query)(() => [media_entity_1.Media], { name: 'medias' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], MediasResolver.prototype, "findAll", null);
__decorate([
    (0, graphql_1.Query)(() => media_entity_1.Media, { name: 'media' }),
    __param(0, (0, graphql_1.Args)('id', { type: () => graphql_1.Int })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], MediasResolver.prototype, "findOne", null);
__decorate([
    (0, graphql_1.Mutation)(() => media_entity_1.Media),
    __param(0, (0, graphql_1.Args)('updateMediaInput')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [update_media_input_1.UpdateMediaInput]),
    __metadata("design:returntype", void 0)
], MediasResolver.prototype, "updateMedia", null);
__decorate([
    (0, graphql_1.Mutation)(() => media_entity_1.Media),
    __param(0, (0, graphql_1.Args)('id', { type: () => graphql_1.Int })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], MediasResolver.prototype, "removeMedia", null);
exports.MediasResolver = MediasResolver = __decorate([
    (0, graphql_1.Resolver)(() => media_entity_1.Media),
    (0, common_1.UseGuards)(gql_auth_guard_1.GqlAuthGuard),
    __metadata("design:paramtypes", [medias_service_1.MediasService])
], MediasResolver);
//# sourceMappingURL=medias.resolver.js.map