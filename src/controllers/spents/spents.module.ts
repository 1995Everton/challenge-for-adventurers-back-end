import { Module, HttpModule } from '@nestjs/common';

import { SpentsService } from './spents.service';
import { SpentsController } from './spents.controller';

@Module({
    imports: [
        HttpModule
    ],
    controllers: [
        SpentsController
    ],
    providers: [
        SpentsService
    ],
})
export class SpentsModule {}
