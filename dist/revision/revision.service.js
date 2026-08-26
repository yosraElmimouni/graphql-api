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
exports.RevisionService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const revision_entity_1 = require("./entities/revision.entity");
let RevisionService = class RevisionService {
    revisionRepository;
    constructor(revisionRepository) {
        this.revisionRepository = revisionRepository;
    }
    async create(createRevisionInput) {
        const { userId, articleId, ...rest } = createRevisionInput;
        const revision = this.revisionRepository.create({
            ...rest,
            user: { id: userId },
            article: { id: articleId },
        });
        const saved = await this.revisionRepository.save(revision);
        return this.findOne(saved.id);
    }
    findAll() {
        return this.revisionRepository.find({ relations: { user: true, article: true } });
    }
    async findOne(id) {
        const revision = await this.revisionRepository.findOne({
            where: { id },
            relations: { user: true, article: true },
        });
        if (!revision)
            throw new common_1.NotFoundException(`Revision #${id} introuvable`);
        return revision;
    }
    async update(id, updateRevisionInput) {
        const { userId, articleId, ...rest } = updateRevisionInput;
        await this.revisionRepository.update(id, {
            ...rest,
            ...(userId ? { user: { id: userId } } : {}),
            ...(articleId ? { article: { id: articleId } } : {}),
        });
        return this.findOne(id);
    }
    async remove(id) {
        const revision = await this.findOne(id);
        await this.revisionRepository.remove(revision);
        return revision;
    }
};
exports.RevisionService = RevisionService;
exports.RevisionService = RevisionService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(revision_entity_1.Revision)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], RevisionService);
//# sourceMappingURL=revision.service.js.map