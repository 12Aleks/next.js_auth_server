import {NestFactory} from '@nestjs/core';
import {AppModule} from './app.module';
import {ValidationPipe} from "@nestjs/common";
//The CORS package
import {NestExpressApplication} from '@nestjs/platform-express';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    app.setGlobalPrefix('api');

    app.enableCors(
        {
            origin: 'http://localhost:3000',
            credentials: true
        }
    );

    //global check
    app.useGlobalPipes(new ValidationPipe({
        // removes any properties from the incoming request that are not part of the DTO
        whitelist: true,
        // return Error with information about any properties
        forbidNonWhitelisted: true,
        //automatic transformation of payloads to DTO types
        transform: true
    }));

    await app.listen(8000);
}

bootstrap();
