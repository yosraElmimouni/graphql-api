"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MediasModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const medias_service_1 = require("./medias.service");
const medias_resolver_1 = require("./medias.resolver");
const media_entity_1 = require("./entities/media.entity");
let MediasModule = class MediasModule {
};
exports.MediasModule = MediasModule;
exports.MediasModule = MediasModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([media_entity_1.Media])],
        providers: [medias_resolver_1.MediasResolver, medias_service_1.MediasService],
    })
], MediasModule);
//# sourceMappingURL=medias.module.js.map