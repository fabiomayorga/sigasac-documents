import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

import { APP } from './config';

import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';

async function bootstrap() {
    const app = await NestFactory.create(AppModule, {
        logger: false
    });

    const options = new DocumentBuilder()
        .setTitle(`${APP.name}`.toUpperCase())
        .setDescription(`${APP.description}`)
        .setVersion(APP.version)
        .addBearerAuth()
        .build();

    const document = SwaggerModule.createDocument(app, options);
    SwaggerModule.setup(`${APP.name}/apiDoc`, app, document);

    await app.listen(APP.port, () =>
        Logger.log(`app running at http://localhost:${APP.port}`)
    );
}

bootstrap();
