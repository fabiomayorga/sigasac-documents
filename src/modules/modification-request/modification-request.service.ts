import { Injectable, Inject } from '@nestjs/common';
import { Repository } from 'typeorm';

import { MODIFICATION_REQUEST_REPOSITORY } from '../../config';

import { ModificationRequest } from './modification-request.entity';

@Injectable()
export class ModificationRequestService {
    constructor(
        @Inject(MODIFICATION_REQUEST_REPOSITORY)
        private readonly modificationRequest: Repository<ModificationRequest>
    ) {}
}
