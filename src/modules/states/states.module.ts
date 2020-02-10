import { Module } from '@nestjs/common';

import { DatabaseModule } from '../../database/database.module';

import { StatesController } from './states.controller';
import { RequestStatusProvider } from './request.status.provider';
import { StatesProvider } from './states.provider';
import { StatesService } from './states.service';

@Module({
    imports: [DatabaseModule],
    controllers: [StatesController],
    providers: [...RequestStatusProvider, ...StatesProvider, StatesService]
})
export class StatesModule {}
