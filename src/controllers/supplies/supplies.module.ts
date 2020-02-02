import { Module, HttpModule } from '@nestjs/common';

import { SuppliesController } from './supplies.controller';
import { SuppliesService } from './supplies.service';

@Module({
    imports: [
        HttpModule
    ],
    controllers: [
        SuppliesController
    ],
    providers: [
        SuppliesService
    ],
})
export class SuppliesModule {}
