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
exports.AgendaResolver = void 0;
const graphql_1 = require("@nestjs/graphql");
const common_1 = require("@nestjs/common");
const agenda_service_1 = require("./agenda.service");
const agenda_entity_1 = require("./entities/agenda.entity");
const create_agenda_input_1 = require("./dto/create-agenda.input");
const update_agenda_input_1 = require("./dto/update-agenda.input");
const gql_auth_guard_1 = require("../auth/guards/gql-auth.guard");
let AgendaResolver = class AgendaResolver {
    agendaService;
    constructor(agendaService) {
        this.agendaService = agendaService;
    }
    createAgenda(createAgendaInput) {
        return this.agendaService.create(createAgendaInput);
    }
    findAll() {
        return this.agendaService.findAll();
    }
    findOne(id) {
        return this.agendaService.findOne(id);
    }
    updateAgenda(updateAgendaInput) {
        return this.agendaService.update(updateAgendaInput.id, updateAgendaInput);
    }
    removeAgenda(id) {
        return this.agendaService.remove(id);
    }
};
exports.AgendaResolver = AgendaResolver;
__decorate([
    (0, graphql_1.Mutation)(() => agenda_entity_1.Agenda),
    __param(0, (0, graphql_1.Args)('createAgendaInput')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_agenda_input_1.CreateAgendaInput]),
    __metadata("design:returntype", void 0)
], AgendaResolver.prototype, "createAgenda", null);
__decorate([
    (0, graphql_1.Query)(() => [agenda_entity_1.Agenda], { name: 'agendas' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], AgendaResolver.prototype, "findAll", null);
__decorate([
    (0, graphql_1.Query)(() => agenda_entity_1.Agenda, { name: 'agenda' }),
    __param(0, (0, graphql_1.Args)('id', { type: () => graphql_1.Int })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], AgendaResolver.prototype, "findOne", null);
__decorate([
    (0, graphql_1.Mutation)(() => agenda_entity_1.Agenda),
    __param(0, (0, graphql_1.Args)('updateAgendaInput')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [update_agenda_input_1.UpdateAgendaInput]),
    __metadata("design:returntype", void 0)
], AgendaResolver.prototype, "updateAgenda", null);
__decorate([
    (0, graphql_1.Mutation)(() => agenda_entity_1.Agenda),
    __param(0, (0, graphql_1.Args)('id', { type: () => graphql_1.Int })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], AgendaResolver.prototype, "removeAgenda", null);
exports.AgendaResolver = AgendaResolver = __decorate([
    (0, graphql_1.Resolver)(() => agenda_entity_1.Agenda),
    (0, common_1.UseGuards)(gql_auth_guard_1.GqlAuthGuard),
    __metadata("design:paramtypes", [agenda_service_1.AgendaService])
], AgendaResolver);
//# sourceMappingURL=agenda.resolver.js.map