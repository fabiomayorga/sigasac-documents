import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';

import { JwtStrategy } from './jwt.strategy';

import { APP } from '../config';

@Module({
    imports: [
        JwtModule.register({
            secret: APP.tokenSecret,
            signOptions: {
                expiresIn: APP.tokenExpiration,
                algorithm: APP.tokenAlgorithm
            }
        })
    ],
    providers: [JwtStrategy]
})
export class AuthModule {}
