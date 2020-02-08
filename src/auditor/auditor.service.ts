import { Injectable, Inject } from '@nestjs/common';
import { Repository } from 'typeorm';

import { DATABASE_AUDIT_REPOSITORY } from '../config';

import { EntityService } from 'src/entity/entity.service';

import { DatabaseAudit } from './auditor.entity';

import { AuditDto } from './dto';

@Injectable()
export class AuditorService {
    constructor(
        @Inject(DATABASE_AUDIT_REPOSITORY)
        private readonly databaseAudit: Repository<DatabaseAudit>,
        private readonly entityService: EntityService
    ) {}

    async create(auditDto: AuditDto) {
        try {
            const entity = await this.entityService.getById(auditDto.entityId);

            if (entity.state) {
                await this.databaseAudit.save(auditDto);
            }
        } catch (error) {
            throw error;
        }
    }

    async getAll() {
        try {
            return this.databaseAudit.find({ order: { id: 'ASC' } });
        } catch (error) {
            throw error;
        }
    }
}
