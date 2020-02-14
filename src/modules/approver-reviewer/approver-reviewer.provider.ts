import { Connection } from 'typeorm';

import { DATABASE_CONNECTION, ACTIONS, APPROVER_REVIEWER } from '../../config';

import { Action } from './action.entity';
import { ApproverReviewer } from './approver-reviewer.entity';

export const ApproverReviewerProvider = [
    {
        provide: ACTIONS,
        useFactory: (connection: Connection) =>
            connection.getRepository(Action),
        inject: [DATABASE_CONNECTION]
    },
    {
        provide: APPROVER_REVIEWER,
        useFactory: (connection: Connection) =>
            connection.getRepository(ApproverReviewer),
        inject: [DATABASE_CONNECTION]
    }
];
