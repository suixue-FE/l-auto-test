import { Module } from '@nestjs/common';
import { PlaywrightController } from './playwright.controller';
import { PlaywrightService } from './playwright.service';

@Module({
  imports: [],
  controllers: [PlaywrightController],
  providers: [PlaywrightService],
})
export class PlaywrightModule {}
