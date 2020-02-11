import { Module } from '@nestjs/common';

import { DatabaseModule } from 'src/modules/database/database.module';
import { MonthsModule } from 'src/modules/months/months.module';

import { BudgetNotesController } from './budget-notes.controller';
import { BudgetNotesProvider } from './budget-notes.providers';
import { BudgetNotesDetailProvider } from './budget-notes-detail.provider';
import { BudgetNotesService } from './budget-notes.service';

@Module({
    imports: [DatabaseModule, MonthsModule],
    controllers: [BudgetNotesController],
    providers: [
        ...BudgetNotesProvider,
        ...BudgetNotesDetailProvider,
        BudgetNotesService
    ]
})
export class BudgetNotesModule {}
