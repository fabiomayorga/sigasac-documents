import { Module } from '@nestjs/common';
import { EntityController } from './entity.controller';
import { EntityService } from './entity.service';
import { DatabaseModule } from '../database/database.module';
import { entityProviders } from './entity.providers';

@Module({
    imports: [DatabaseModule],
    controllers: [EntityController],
    providers: [...entityProviders, EntityService],
    exports: [EntityService]
})
export class EntityModule {}
