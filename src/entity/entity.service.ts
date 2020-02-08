import { Injectable, Inject } from '@nestjs/common';
import { Repository } from 'typeorm';

import { DB_ENTITY_REPOSITORY } from '../config';
import { DBEntity } from './entity.entity';

@Injectable()
export class EntityService {
    constructor(
        @Inject(DB_ENTITY_REPOSITORY)
        private readonly dbEntity: Repository<DBEntity>
    ) {}

    async getById(id: number) {
        try {
            return this.dbEntity.findOne(id);
        } catch (error) {
            throw error;
        }
    }

    async getAll() {
        try {
            return this.dbEntity.find({ order: { id: 'ASC' } });
        } catch (error) {
            throw error;
        }
    }
}
