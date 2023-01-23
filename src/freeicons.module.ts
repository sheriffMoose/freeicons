import { Module } from '@nestjs/common';
import { FreeIconsController } from './freeicons.controller';
import { FreeIconsService } from './freeicons.service';

@Module({
  imports: [],
  controllers: [FreeIconsController],
  providers: [FreeIconsService],
})
export class FreeIconsModule {}
