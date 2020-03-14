import { Connection } from 'typeorm';

import {
    DATABASE_CONNECTION,
    HISTORICAL_EXPENSES_REPOSITORY
} from 'src/config';

import { HistoricalExpenses } from '../entities/historical_expenses.entity';

export const ExpensesProvider = [
    {
        provide: HISTORICAL_EXPENSES_REPOSITORY,
        useFactory: (connection: Connection) =>
            connection.getRepository(HistoricalExpenses),
        inject: [DATABASE_CONNECTION]
    }
];
