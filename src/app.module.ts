import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {PlaywrightModule} from './modules/playwright/playwright.module'
@Module({
  imports: [PlaywrightModule],
  // controllers: [AppController],
  // providers: [AppService],
})
export class AppModule {}
