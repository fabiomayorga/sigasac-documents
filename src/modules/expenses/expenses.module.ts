import { Module } from '@nestjs/common';
import { DatabaseModule } from "../database/database.module";

import { ExpensesController } from './expenses.controller';
import { ExpensesProvider } from "./expenses.provider";
import { ExpensesService } from './expenses.service';

@Module({
  imports: [DatabaseModule],
  controllers: [ExpensesController],
  providers: [ExpensesService, ...ExpensesProvider]
})
export class ExpensesModule {}
