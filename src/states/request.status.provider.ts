import { Connection } from 'typeorm';

import { DATABASE_CONNECTION, REQUEST_STATUS_REPOSITORY } from 'src/config';

import { RequestStatus } from './request-status.entity';

export const RequestStatusProvider = [
    {
        provide: REQUEST_STATUS_REPOSITORY,
        useFactory: (connection: Connection) =>
            connection.getRepository(RequestStatus),
        inject: [DATABASE_CONNECTION]
    }
];
