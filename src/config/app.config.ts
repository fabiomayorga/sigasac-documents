import { EasyconfigService } from 'nestjs-easyconfig';

const config: EasyconfigService = new EasyconfigService({ path: '' });

const name = config.get('APP_NAME');
const version = config.get('APP_VERSION');

export const APP = {
    name,
    version,
    description: config.get('APP_DESCRIPTION'),
    port: parseInt(config.get('APP_PORT'), 10),
    host: config.get('APP_HOST'),
    tokenSecret: config.get('APP_TOKEN_SECRET'),
    tokenAlgorithm: config.get('APP_TOKEN_ALGORITHM'),
    tokenExpiration: config.get('APP_TOKEN_EXPIRATION'),
    baseURL: `${name}/${version}`
};
