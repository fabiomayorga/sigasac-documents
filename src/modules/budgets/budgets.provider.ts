import { Connection } from 'typeorm';

import { DATABASE_CONNECTION, BUDGET_REPOSITORY } from 'src/config';

import { Budget } from './budgets.entity';

export const BudgetsProvider = [
    {
        provide: BUDGET_REPOSITORY,
        useFactory: (connection: Connection) =>
            connection.getRepository(Budget),
        inject: [DATABASE_CONNECTION]
    }
];
