import { Module } from '@nestjs/common';

import { DatabaseModule } from '../database/database.module';
import { EntityModule } from '../entity/entity.module';
import { AuditorController } from './auditor.controller';
import { AuditorService } from './auditor.service';
import { auditorProviders } from './auditor.providers';

@Module({
    imports: [DatabaseModule, EntityModule],
    controllers: [AuditorController],
    providers: [...auditorProviders, AuditorService]
})
export class AuditorModule {}
