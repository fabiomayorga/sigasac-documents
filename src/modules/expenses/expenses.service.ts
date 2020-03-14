import { Injectable, Inject } from '@nestjs/common';
import { Repository } from 'typeorm';

import { HISTORICAL_EXPENSES_REPOSITORY } from 'src/config';
import { HistoricalExpenses } from '../entities/historical_expenses.entity';

@Injectable()
export class ExpensesService {
    constructor(
        @Inject(HISTORICAL_EXPENSES_REPOSITORY)
        private readonly historicalExpenses: Repository<HistoricalExpenses>
    ) {}
}
