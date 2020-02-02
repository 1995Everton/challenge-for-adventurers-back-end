import { Module } from '@nestjs/common';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';

import { HttpErrorFilter } from './shared/http-error.filter';
import { LoggingInterceptor } from './shared/logging.interceptor';
import { PricesModule } from './controllers/prices/prices.module';
import { SpentsModule } from './controllers/spents/spents.module';
import { SuppliesModule } from './controllers/supplies/supplies.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TotalModule } from './controllers/total/total.module';

@Module({
  imports: [
    TotalModule, 
    PricesModule,
    SpentsModule,
    SuppliesModule
  ],
  controllers: [
    AppController
  ],
  providers: [
    AppService,
    {
      provide: APP_FILTER,
      useClass: HttpErrorFilter
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: LoggingInterceptor
    }
  ],
})
export class AppModule {}
