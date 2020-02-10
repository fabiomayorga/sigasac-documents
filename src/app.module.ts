import { Module } from '@nestjs/common';
import { EasyconfigModule } from 'nestjs-easyconfig';
import { AuthModule } from './modules/auth/auth.module';
import { BudgetNotesModule } from './modules/budget-notes/budget-notes.module';
import { MonthsModule } from './modules/months/months.module';
import { StatesModule } from './modules/states/states.module';
import { ModificationRequestModule } from './modules/modification-request/modification-request.module';

@Module({
    imports: [
        AuthModule,
        EasyconfigModule.register({}),
        BudgetNotesModule,
        MonthsModule,
        StatesModule,
        ModificationRequestModule
    ],
    controllers: [],
    providers: []
})
export class AppModule {}
