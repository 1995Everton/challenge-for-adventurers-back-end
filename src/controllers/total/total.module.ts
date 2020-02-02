import { TotalService } from './total.service';
import { TotalController } from './total.controller';
import { Module, HttpModule } from '@nestjs/common';

@Module({
    imports: [
        HttpModule
    ],
    controllers: [
        TotalController
    ],
    providers: [
        TotalService
    ],
})
export class TotalModule {}
