import { Connection } from 'typeorm';

import {
    DATABASE_CONNECTION,
    BUDGET_NOTE_DETAIL_REPOSITORY
} from '../../config';

import { SingleAccountPlan } from './single-account-plan.entity';

export const EntitiesProvider = [
    {
        provide: 'SINGLE_ACCOUNT_PLAN_REPOSITORY',
        useFactory: (connection: Connection) =>
            connection.getRepository(SingleAccountPlan),
        inject: [DATABASE_CONNECTION]
    }
];
