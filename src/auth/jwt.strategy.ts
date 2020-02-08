import { Injectable } from '@nestjs/common';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';

import { APP } from '../config';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor() {
        try {
            super({
                jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
                ignoreExpiration: false,
                secretOrKey: APP.tokenSecret
            });
        } catch (error) {
            throw error;
        }
    }

    async validate(payload: any) {
        try {
            return payload;
        } catch (error) {
            throw error;
        }
    }
}
