import { Module } from '@nestjs/common';

import { DatabaseModule } from 'src/modules/database/database.module';

import { BudgetsController } from './budgets.controller';

import { BudgetsProvider } from './budgets.provider';
import { ConceptsProvider } from './concepts.provider';
import { SubconceptsProvider } from './subconcepts.provider';

import { BudgetsService } from './budgets.service';

@Module({
    imports: [DatabaseModule],
    controllers: [BudgetsController],
    providers: [
        ...BudgetsProvider,
        ...ConceptsProvider,
        ...SubconceptsProvider,
        BudgetsService
    ]
})
export class BudgetsModule {}
