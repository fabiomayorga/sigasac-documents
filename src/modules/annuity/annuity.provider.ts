import { Connection } from 'typeorm';

import {
    DATABASE_CONNECTION,
    ANNUITY_REPOSITORY
} from '../../config';

import { Annuity } from '../entities/annuity.entity';


export const AnnuityProvider = [
    {
        provide: ANNUITY_REPOSITORY,
        useFactory: (connection: Connection) =>
            connection.getRepository(Annuity),
        inject: [DATABASE_CONNECTION]
    }
];