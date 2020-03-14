import { Connection } from 'typeorm';

import { DATABASE_CONNECTION, HISTORICAL_INCOME_REPOSITORY } from 'src/config';

import { HistoricalIncome } from '../entities/historical_income.entity';

export const IncomeProvider = [
    {
        provide: HISTORICAL_INCOME_REPOSITORY,
        useFactory: (connection: Connection) =>
            connection.getRepository(HistoricalIncome),
        inject: [DATABASE_CONNECTION]
    }
];
