import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { Logger } from '@nestjs/common';
import 'dotenv/config'

import { AppModule } from './app.module';
import { PricesModule } from './controllers/prices/prices.module';
import { SpentsModule } from './controllers/spents/spents.module';
import { SuppliesModule } from './controllers/supplies/supplies.module';
import { TotalModule } from './controllers/total/total.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const options = new DocumentBuilder()
    .setTitle(process.env.DOCS_TITLE)
    .setDescription(process.env.DOCS_SUBTITLE)
    .setVersion(process.env.DOCS_VERSION)
    .addServer("http://localhost:" + process.env.PORT)
    .addTag('prices')
    .addTag('spents')
    .addTag('supplies')
    .addTag('total')
    .build();
  const document = SwaggerModule.createDocument(app, options,{
    include: [ 
      PricesModule,
      SpentsModule,
      SuppliesModule,
      TotalModule
    ]
  });
  SwaggerModule.setup('api', app, document);

  app.enableCors();
  Logger.log('Server Lister Port: ' + process.env.PORT)
  await app.listen(process.env.PORT);
}
bootstrap();
