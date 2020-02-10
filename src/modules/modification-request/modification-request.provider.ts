import { Connection } from 'typeorm';

import {
    DATABASE_CONNECTION,
    MODIFICATION_REQUEST_REPOSITORY
} from '../../config';

import { ModificationRequest } from './modification-request.entity';

export const ModificationRequestProvider = [
    {
        provide: MODIFICATION_REQUEST_REPOSITORY,
        useFactory: (connection: Connection) =>
            connection.getRepository(ModificationRequest),
        inject: [DATABASE_CONNECTION]
    }
];
