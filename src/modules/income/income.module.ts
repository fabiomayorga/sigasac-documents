import { Module } from '@nestjs/common';
import { DatabaseModule } from "../database/database.module";
import { IncomeController } from './income.controller';
import { IncomeProvider } from "./income.provider";
import { IncomeService } from './income.service';

@Module({
  imports: [DatabaseModule],
  controllers: [IncomeController],
  providers: [IncomeService, ...IncomeProvider]
})
export class IncomeModule {}
