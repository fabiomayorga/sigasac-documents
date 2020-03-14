import { Injectable, Inject } from '@nestjs/common';
import { Repository } from 'typeorm';

import { HISTORICAL_EXPENSES_REPOSITORY } from 'src/config';
import { HistoricalExpenses } from '../entities/historical_expenses.entity';

import { ExpensesDto } from './dto';

@Injectable()
export class ExpensesService {
    constructor(
        @Inject(HISTORICAL_EXPENSES_REPOSITORY)
        private readonly historicalExpenses: Repository<HistoricalExpenses>
    ) {}

    async create(expensesDto: ExpensesDto) {
        try {
            const expense = await this.historicalExpenses.save(expensesDto);

            return expense;
        } catch (error) {
            throw error;
        }
    }

    async update(id: number, expensesDto: ExpensesDto) {
        try {
            const expense = await this.historicalExpenses.findOne(id);

            if (expense) {
                await this.historicalExpenses.save(expense, {
                    data: expensesDto
                });
            }
        } catch (error) {
            throw error;
        }
    }
}
