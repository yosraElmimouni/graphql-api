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
exports.ChatbotAiResolver = void 0;
const graphql_1 = require("@nestjs/graphql");
const common_1 = require("@nestjs/common");
const chatbot_ai_service_1 = require("./chatbot-ai.service");
const chatbot_ai_entity_1 = require("./entities/chatbot-ai.entity");
const create_chatbot_ai_input_1 = require("./dto/create-chatbot-ai.input");
const update_chatbot_ai_input_1 = require("./dto/update-chatbot-ai.input");
const gql_auth_guard_1 = require("../auth/guards/gql-auth.guard");
let ChatbotAiResolver = class ChatbotAiResolver {
    chatbotAiService;
    constructor(chatbotAiService) {
        this.chatbotAiService = chatbotAiService;
    }
    createChatbotAi(createChatbotAiInput) {
        return this.chatbotAiService.create(createChatbotAiInput);
    }
    findAll() {
        return this.chatbotAiService.findAll();
    }
    findOne(id) {
        return this.chatbotAiService.findOne(id);
    }
    updateChatbotAi(updateChatbotAiInput) {
        return this.chatbotAiService.update(updateChatbotAiInput.id, updateChatbotAiInput);
    }
    removeChatbotAi(id) {
        return this.chatbotAiService.remove(id);
    }
};
exports.ChatbotAiResolver = ChatbotAiResolver;
__decorate([
    (0, graphql_1.Mutation)(() => chatbot_ai_entity_1.ChatbotAi),
    __param(0, (0, graphql_1.Args)('createChatbotAiInput')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_chatbot_ai_input_1.CreateChatbotAiInput]),
    __metadata("design:returntype", void 0)
], ChatbotAiResolver.prototype, "createChatbotAi", null);
__decorate([
    (0, graphql_1.Query)(() => [chatbot_ai_entity_1.ChatbotAi], { name: 'chatbotAis' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], ChatbotAiResolver.prototype, "findAll", null);
__decorate([
    (0, graphql_1.Query)(() => chatbot_ai_entity_1.ChatbotAi, { name: 'chatbotAi' }),
    __param(0, (0, graphql_1.Args)('id', { type: () => graphql_1.Int })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], ChatbotAiResolver.prototype, "findOne", null);
__decorate([
    (0, graphql_1.Mutation)(() => chatbot_ai_entity_1.ChatbotAi),
    __param(0, (0, graphql_1.Args)('updateChatbotAiInput')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [update_chatbot_ai_input_1.UpdateChatbotAiInput]),
    __metadata("design:returntype", void 0)
], ChatbotAiResolver.prototype, "updateChatbotAi", null);
__decorate([
    (0, graphql_1.Mutation)(() => chatbot_ai_entity_1.ChatbotAi),
    __param(0, (0, graphql_1.Args)('id', { type: () => graphql_1.Int })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], ChatbotAiResolver.prototype, "removeChatbotAi", null);
exports.ChatbotAiResolver = ChatbotAiResolver = __decorate([
    (0, graphql_1.Resolver)(() => chatbot_ai_entity_1.ChatbotAi),
    (0, common_1.UseGuards)(gql_auth_guard_1.GqlAuthGuard),
    __metadata("design:paramtypes", [chatbot_ai_service_1.ChatbotAiService])
], ChatbotAiResolver);
//# sourceMappingURL=chatbot-ai.resolver.js.map