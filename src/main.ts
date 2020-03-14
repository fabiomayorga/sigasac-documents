import { NestFactory } from '@nestjs/core';
import { Logger, ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

import { APP } from './config';
import { HttpExceptionFilter } from './utils';

import { AppModule } from './app.module';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);

    app.useGlobalPipes(new ValidationPipe());

    app.useGlobalFilters(new HttpExceptionFilter());

    app.enableCors();

    const options = new DocumentBuilder()
        .setTitle(`${APP.name}`.toUpperCase())
        .setDescription(`${APP.description}`)
        .setVersion(APP.version)
        .addBearerAuth()
        .build();

    const document = SwaggerModule.createDocument(app, options);
    SwaggerModule.setup(`${APP.name}/apiDoc`, app, document);

    await app.listen(APP.port, () => {
        Logger.log(`app running at http://localhost:${APP.port}`);
        Logger.log(`docs: http://localhost:${APP.port}/${APP.name}/apidoc`);
    });
}

bootstrap();
