import { Module } from '@nestjs/common';
import { EasyconfigModule } from 'nestjs-easyconfig';
import { AuthModule } from './auth/auth.module';
import { BudgetNotesModule } from './budget-notes/budget-notes.module';
import { MonthsModule } from './months/months.module';

@Module({
    imports: [
        AuthModule,
        EasyconfigModule.register({}),
        BudgetNotesModule,
        MonthsModule
    ],
    controllers: [],
    providers: []
})
export class AppModule {}
