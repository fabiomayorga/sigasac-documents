import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

import { APP } from './config';

import { AppModule } from './app.module';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);

    const options = new DocumentBuilder()
        .setTitle(`${APP.name}`.toUpperCase())
        .setDescription(`${APP.name}`)
        .setVersion(APP.version)
        .addBearerAuth()
        .build();

    const document = SwaggerModule.createDocument(app, options);
    SwaggerModule.setup(`${APP.name}/apiDoc`, app, document);

    await app.listen(APP.port);
}

bootstrap();
