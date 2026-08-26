"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChatbotAiModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const chatbot_ai_service_1 = require("./chatbot-ai.service");
const chatbot_ai_resolver_1 = require("./chatbot-ai.resolver");
const chatbot_ai_entity_1 = require("./entities/chatbot-ai.entity");
let ChatbotAiModule = class ChatbotAiModule {
};
exports.ChatbotAiModule = ChatbotAiModule;
exports.ChatbotAiModule = ChatbotAiModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([chatbot_ai_entity_1.ChatbotAi])],
        providers: [chatbot_ai_resolver_1.ChatbotAiResolver, chatbot_ai_service_1.ChatbotAiService],
    })
], ChatbotAiModule);
//# sourceMappingURL=chatbot-ai.module.js.map