import { createConnection } from 'typeorm';

import { DATABASE_CONNECTION, DATABASE } from '../config';

export const databaseProviders = [
    {
        provide: DATABASE_CONNECTION,
        useFactory: async () =>
            await createConnection({
                type: 'postgres',
                host: DATABASE.host,
                port: DATABASE.port,
                username: DATABASE.username,
                password: DATABASE.password,
                database: DATABASE.name,
                entities: [__dirname + '/../**/*.entity{.ts,.js}'],
                synchronize: DATABASE.synchronize,
                logging: DATABASE.logging
            })
    }
];
