import { Connection } from 'typeorm';

import { DATABASE_CONNECTION, BUDGET_NOTE_DETAIL_REPOSITORY } from '../config';

import { BudgetNotesDetail } from './budget-notes-detail.entity';

export const BudgetNotesDetailProvider = [
    {
        provide: BUDGET_NOTE_DETAIL_REPOSITORY,
        useFactory: (connection: Connection) =>
            connection.getRepository(BudgetNotesDetail),
        inject: [DATABASE_CONNECTION]
    }
];
