import { Module } from '@nestjs/common';
import { EasyconfigModule } from 'nestjs-easyconfig';
import { AuthModule } from './auth/auth.module';
import { BudgetNotesModule } from './budget-notes/budget-notes.module';
import { MonthsModule } from './months/months.module';
import { StatesModule } from './states/states.module';

@Module({
    imports: [
        AuthModule,
        EasyconfigModule.register({}),
        BudgetNotesModule,
        MonthsModule,
        StatesModule
    ],
    controllers: [],
    providers: []
})
export class AppModule {}
