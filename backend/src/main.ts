import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import * as compression from 'compression';
import * as helmet from 'helmet';

/**
 * Función principal para iniciar la aplicación NestJS
 * Configura middleware de seguridad, validación y documentación Swagger
 */
async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Configuración de seguridad
  app.use(helmet());
  app.use(compression());

  // Configuración de CORS
  app.enableCors({
    origin: process.env.CORS_ORIGIN || 'http://localhost:3000',
    credentials: true,
  });

  // Configuración de validación global
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  // Configuración de Swagger
  const config = new DocumentBuilder()
    .setTitle(process.env.SWAGGER_TITLE || 'ProSports API')
    .setDescription(
      process.env.SWAGGER_DESCRIPTION || 
      'API para la Plataforma Integral de Gestión Deportiva'
    )
    .setVersion(process.env.SWAGGER_VERSION || '1.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document);

  // Configuración del puerto
  const port = process.env.PORT || 3001;
  
  await app.listen(port);
  
  console.log(`🚀 ProSports API ejecutándose en el puerto ${port}`);
  console.log(`📚 Documentación disponible en: http://localhost:${port}/api/docs`);
}

bootstrap(); 