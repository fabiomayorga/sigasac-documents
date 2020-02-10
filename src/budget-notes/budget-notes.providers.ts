import { Connection } from 'typeorm';

import { DATABASE_CONNECTION, BUDGET_NOTE_REPOSITORY } from '../config';

import { BudgetNote } from './budget-notes.entity';

export const BudgetNotesProvider = [
    {
        provide: BUDGET_NOTE_REPOSITORY,
        useFactory: (connection: Connection) =>
            connection.getRepository(BudgetNote),
        inject: [DATABASE_CONNECTION]
    }
];
