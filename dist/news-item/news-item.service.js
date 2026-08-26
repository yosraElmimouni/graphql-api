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
exports.NewsItemService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const news_item_entity_1 = require("./entities/news-item.entity");
let NewsItemService = class NewsItemService {
    newsItemRepository;
    constructor(newsItemRepository) {
        this.newsItemRepository = newsItemRepository;
    }
    async create(createNewsItemInput) {
        const { sourceId, ...rest } = createNewsItemInput;
        const newsItem = this.newsItemRepository.create({
            ...rest,
            source: { id: sourceId },
        });
        const saved = await this.newsItemRepository.save(newsItem);
        return this.findOne(saved.id);
    }
    findAll() {
        return this.newsItemRepository.find({ relations: { source: true, articles: true } });
    }
    async findOne(id) {
        const newsItem = await this.newsItemRepository.findOne({
            where: { id },
            relations: { source: true, articles: true },
        });
        if (!newsItem)
            throw new common_1.NotFoundException(`NewsItem #${id} introuvable`);
        return newsItem;
    }
    async update(id, updateNewsItemInput) {
        const { sourceId, ...rest } = updateNewsItemInput;
        await this.newsItemRepository.update(id, {
            ...rest,
            ...(sourceId ? { source: { id: sourceId } } : {}),
        });
        return this.findOne(id);
    }
    async remove(id) {
        const newsItem = await this.findOne(id);
        await this.newsItemRepository.remove(newsItem);
        return newsItem;
    }
};
exports.NewsItemService = NewsItemService;
exports.NewsItemService = NewsItemService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(news_item_entity_1.NewsItem)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], NewsItemService);
//# sourceMappingURL=news-item.service.js.map