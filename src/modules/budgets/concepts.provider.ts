import { Connection } from 'typeorm';

import { DATABASE_CONNECTION, CONCEPT_REPOSITORY } from 'src/config';

import { Concept } from './concepts.entity';

export const ConceptsProvider = [
    {
        provide: CONCEPT_REPOSITORY,
        useFactory: (connection: Connection) =>
            connection.getRepository(Concept),
        inject: [DATABASE_CONNECTION]
    }
];
