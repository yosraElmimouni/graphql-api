"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NewsItemModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const news_item_service_1 = require("./news-item.service");
const news_item_resolver_1 = require("./news-item.resolver");
const news_item_entity_1 = require("./entities/news-item.entity");
let NewsItemModule = class NewsItemModule {
};
exports.NewsItemModule = NewsItemModule;
exports.NewsItemModule = NewsItemModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([news_item_entity_1.NewsItem])],
        providers: [news_item_resolver_1.NewsItemResolver, news_item_service_1.NewsItemService],
    })
], NewsItemModule);
//# sourceMappingURL=news-item.module.js.map