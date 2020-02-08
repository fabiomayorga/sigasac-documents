import { Connection } from 'typeorm';

import { DATABASE_CONNECTION, DB_ENTITY_REPOSITORY } from '../config';

import { DBEntity } from './entity.entity';

export const entityProviders = [
    {
        provide: DB_ENTITY_REPOSITORY,
        useFactory: (connection: Connection) =>
            connection.getRepository(DBEntity),
        inject: [DATABASE_CONNECTION]
    }
];
