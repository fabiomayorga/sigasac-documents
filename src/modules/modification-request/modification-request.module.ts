import { Module } from '@nestjs/common';

import { DatabaseModule } from 'src/modules/database/database.module';

import { ModificationRequestController } from './modification-request.controller';
import { ModificationRequestProvider } from './modification-request.provider';
import { ModificationRequestService } from './modification-request.service';

@Module({
    imports: [DatabaseModule],
    controllers: [ModificationRequestController],
    providers: [...ModificationRequestProvider, ModificationRequestService]
})
export class ModificationRequestModule {}
