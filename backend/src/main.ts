import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import helmet from 'helmet';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Configuração global de validação para DTOs
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );

  // Configuração do Swagger
  const config = new DocumentBuilder()
    .setTitle('Devnology E-commerce API')
    .setDescription(
      'API para o teste técnico da Devnology - E-commerce com produtos de dois fornecedores',
    )
    .setVersion('1.0')
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, documentFactory());
  app.use(helmet()); // middleware de seguranca
  app.enableCors({
    origin: process.env.FRONTEND_URL,
  }); // Habilita o CORS
  await app.listen(process.env.PORT ?? 3000);
}
void bootstrap();
