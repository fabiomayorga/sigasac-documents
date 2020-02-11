import { Module } from '@nestjs/common';

import { DatabaseModule } from 'src/modules/database/database.module';

import { MonthsController } from './months.controller';
import { MonthsProvider } from './months.provider';
import { MonthsService } from './months.service';

@Module({
    imports: [DatabaseModule],
    exports: [MonthsService],
    controllers: [MonthsController],
    providers: [...MonthsProvider, MonthsService]
})
export class MonthsModule {}
