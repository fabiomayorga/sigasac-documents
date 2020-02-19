import { Connection } from 'typeorm';

import {
    DATABASE_CONNECTION,
    ACTIONS_REPOSITORY,
    APPROVER_REVIEWER_REPOSITORY
} from '../../config';

import { Action } from './action.entity';
import { ApproverReviewer } from './approver-reviewer.entity';

export const ApproverReviewerProvider = [
    {
        provide: ACTIONS_REPOSITORY,
        useFactory: (connection: Connection) =>
            connection.getRepository(Action),
        inject: [DATABASE_CONNECTION]
    },
    {
        provide: APPROVER_REVIEWER_REPOSITORY,
        useFactory: (connection: Connection) =>
            connection.getRepository(ApproverReviewer),
        inject: [DATABASE_CONNECTION]
    }
];
