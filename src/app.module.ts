import { Module } from '@nestjs/common';

import { EasyconfigModule } from 'nestjs-easyconfig';
import { AuthModule } from './modules/auth/auth.module';
import { BudgetsModule } from './modules/budgets/budgets.module';
import { BudgetNotesModule } from './modules/budget-notes/budget-notes.module';
import { ModificationRequestModule } from './modules/modification-request/modification-request.module';
import { MonthsModule } from './modules/months/months.module';
import { StatesModule } from './modules/states/states.module';
import { AvailabilityCertificatesModule } from './modules/availability-certificates/availability-certificates.module';
import { ApproverReviewerModule } from './modules/approver-reviewer/approver-reviewer.module';

@Module({
    imports: [
        AuthModule,
        EasyconfigModule.register({}),
        BudgetsModule,
        BudgetNotesModule,
        ModificationRequestModule,
        MonthsModule,
        StatesModule,
        AvailabilityCertificatesModule,
        ApproverReviewerModule
    ],
    controllers: [],
    providers: []
})
export class AppModule {}
