import { Connection } from 'typeorm';

import { DATABASE_CONNECTION, STATE_REPOSITORY } from 'src/config';

import { State } from './states.entity';

export const StatesProvider = [
    {
        provide: STATE_REPOSITORY,
        useFactory: (connection: Connection) => connection.getRepository(State),
        inject: [DATABASE_CONNECTION]
    }
];
