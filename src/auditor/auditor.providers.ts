import { Connection, Repository } from 'typeorm';

import { DATABASE_CONNECTION, DATABASE_AUDIT_REPOSITORY } from '../config';

import { DatabaseAudit } from './auditor.entity';

export const auditorProviders = [
    {
        provide: DATABASE_AUDIT_REPOSITORY,
        useFactory: (connection: Connection) =>
            connection.getRepository(DatabaseAudit),
        inject: [DATABASE_CONNECTION]
    }
];
