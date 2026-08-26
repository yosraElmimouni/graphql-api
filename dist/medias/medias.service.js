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
exports.MediasService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const media_entity_1 = require("./entities/media.entity");
let MediasService = class MediasService {
    mediasRepository;
    constructor(mediasRepository) {
        this.mediasRepository = mediasRepository;
    }
    async create(createMediaInput) {
        const { articleId, userId, ...rest } = createMediaInput;
        const media = this.mediasRepository.create({
            ...rest,
            article: { id: articleId },
            user: { id: userId },
        });
        const saved = await this.mediasRepository.save(media);
        return this.findOne(saved.id);
    }
    findAll() {
        return this.mediasRepository.find({ relations: { article: true, user: true } });
    }
    async findOne(id) {
        const media = await this.mediasRepository.findOne({
            where: { id },
            relations: { article: true, user: true },
        });
        if (!media)
            throw new common_1.NotFoundException(`Media #${id} introuvable`);
        return media;
    }
    async update(id, updateMediaInput) {
        const { articleId, userId, ...rest } = updateMediaInput;
        await this.mediasRepository.update(id, {
            ...rest,
            ...(articleId ? { article: { id: articleId } } : {}),
            ...(userId ? { user: { id: userId } } : {}),
        });
        return this.findOne(id);
    }
    async remove(id) {
        const media = await this.findOne(id);
        const removed = { ...media };
        await this.mediasRepository.remove(media);
        return removed;
    }
};
exports.MediasService = MediasService;
exports.MediasService = MediasService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(media_entity_1.Media)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], MediasService);
//# sourceMappingURL=medias.service.js.map