import { INestApplication } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import helmet from 'helmet';
import { AuthToken } from './constants';
import { MongoErrorFilter } from './shared/filters/mongo-error.filter';

function swaggerModule(app: INestApplication, swaggerPath: string): void {
  const options = new DocumentBuilder()
    .setTitle('Shop Server')
    .setDescription('Shop API description')
    .setVersion('0.1')
    .addBearerAuth({ type: 'http' }, AuthToken)
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup(swaggerPath, app, document);
}

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');
  swaggerModule(app, '/swagger');
  app.use(helmet());
  app.useGlobalFilters(new MongoErrorFilter());
  await app.listen(3000);
}
bootstrap();
