import { Connection } from 'typeorm';

import { DATABASE_CONNECTION, MONTH_REPOSITORY } from 'src/config';

import { Month } from './months.entity';

export const MonthsProvider = [
    {
        provide: MONTH_REPOSITORY,
        useFactory: (connection: Connection) => connection.getRepository(Month),
        inject: [DATABASE_CONNECTION]
    }
];
