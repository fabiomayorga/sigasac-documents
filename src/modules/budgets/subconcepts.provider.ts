import { Connection } from 'typeorm';

import { DATABASE_CONNECTION, SUBCONCEPT_REPOSITORY } from 'src/config';

import { Subconcept } from './subconcepts.entity';

export const SubconceptsProvider = [
    {
        provide: SUBCONCEPT_REPOSITORY,
        useFactory: (connection: Connection) =>
            connection.getRepository(Subconcept),
        inject: [DATABASE_CONNECTION]
    }
];
