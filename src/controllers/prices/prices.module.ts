import { Module, HttpModule } from '@nestjs/common';

import { PricesController } from './prices.controller';
import { PricesService } from './prices.service';

@Module({
    imports: [
        HttpModule
    ],
    controllers: [
        PricesController
    ],
    providers: [
        PricesService
    ],
})
export class PricesModule {}
