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
exports.ChatbotAiService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const chatbot_ai_entity_1 = require("./entities/chatbot-ai.entity");
let ChatbotAiService = class ChatbotAiService {
    chatbotAiRepository;
    constructor(chatbotAiRepository) {
        this.chatbotAiRepository = chatbotAiRepository;
    }
    async create(createChatbotAiInput) {
        const { userId, ...rest } = createChatbotAiInput;
        const chatbotAi = this.chatbotAiRepository.create({
            ...rest,
            user: { id: userId },
        });
        const saved = await this.chatbotAiRepository.save(chatbotAi);
        return this.findOne(saved.id);
    }
    findAll() {
        return this.chatbotAiRepository.find({ relations: { user: true } });
    }
    async findOne(id) {
        const chatbotAi = await this.chatbotAiRepository.findOne({
            where: { id },
            relations: { user: true },
        });
        if (!chatbotAi)
            throw new common_1.NotFoundException(`ChatbotAi #${id} introuvable`);
        return chatbotAi;
    }
    async update(id, updateChatbotAiInput) {
        const { userId, ...rest } = updateChatbotAiInput;
        await this.chatbotAiRepository.update(id, {
            ...rest,
            ...(userId ? { user: { id: userId } } : {}),
        });
        return this.findOne(id);
    }
    async remove(id) {
        const chatbotAi = await this.findOne(id);
        await this.chatbotAiRepository.remove(chatbotAi);
        return chatbotAi;
    }
};
exports.ChatbotAiService = ChatbotAiService;
exports.ChatbotAiService = ChatbotAiService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(chatbot_ai_entity_1.ChatbotAi)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], ChatbotAiService);
//# sourceMappingURL=chatbot-ai.service.js.map