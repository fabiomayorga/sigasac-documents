import { Injectable, Inject } from '@nestjs/common';
import { Repository } from 'typeorm';

import { STATE_REPOSITORY, REQUEST_STATUS_REPOSITORY } from 'src/config';

import { RequestStatus } from './request-status.entity';
import { State } from './states.entity';

@Injectable()
export class StatesService {
    constructor(
        @Inject(STATE_REPOSITORY)
        private readonly state: Repository<State>,
        @Inject(REQUEST_STATUS_REPOSITORY)
        private readonly requestStatus: Repository<RequestStatus>
    ) {}

    async getAll() {
        try {
            return await this.state.find({ order: { id: 'ASC' } });
        } catch (error) {
            throw error;
        }
    }

    async getAllRequestStatus() {
        try {
            return await this.requestStatus.find({ order: { id: 'ASC' } });
        } catch (error) {
            throw error;
        }
    }
}
