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
exports.AgendaService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const agenda_entity_1 = require("./entities/agenda.entity");
let AgendaService = class AgendaService {
    agendaRepository;
    constructor(agendaRepository) {
        this.agendaRepository = agendaRepository;
    }
    async create(createAgendaInput) {
        const { sourceId, ...rest } = createAgendaInput;
        const agenda = this.agendaRepository.create({
            ...rest,
            source: { id: sourceId },
        });
        const saved = await this.agendaRepository.save(agenda);
        return this.findOne(saved.id);
    }
    findAll() {
        return this.agendaRepository.find({ relations: { source: true } });
    }
    async findOne(id) {
        const agenda = await this.agendaRepository.findOne({
            where: { id },
            relations: { source: true },
        });
        if (!agenda) {
            throw new common_1.NotFoundException(`Agenda #${id} introuvable`);
        }
        return agenda;
    }
    async update(id, updateAgendaInput) {
        const { sourceId, ...rest } = updateAgendaInput;
        await this.agendaRepository.update(id, {
            ...rest,
            ...(sourceId ? { source: { id: sourceId } } : {}),
        });
        return this.findOne(id);
    }
    async remove(id) {
        const agenda = await this.findOne(id);
        const removed = { ...agenda };
        await this.agendaRepository.remove(agenda);
        return removed;
    }
};
exports.AgendaService = AgendaService;
exports.AgendaService = AgendaService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(agenda_entity_1.Agenda)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], AgendaService);
//# sourceMappingURL=agenda.service.js.map