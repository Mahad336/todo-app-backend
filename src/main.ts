import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();

  //swagger
  const config = new DocumentBuilder()
    .setTitle('Todo Backend Greeka')
    .setDescription('The Todo Backend Greeka Api Documentation')
    .setVersion('1.0')
    .build();

  //port from env
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  const configService = app.get(ConfigService);
  const port = configService.get<number>('PORT') || 5000;

  //server listen
  await app.listen(port);
}
bootstrap();
