import { Controller, Get, Query } from '@nestjs/common';
import { PlaywrightService } from './playwright.service';
import { ApiQuery } from '@nestjs/swagger';

@Controller('/playwrite')
export class PlaywrightController {
  constructor(private readonly playwrightService: PlaywrightService) {}

  @Get('test')
  getHello(): string {
    return '1111';
  }

  @Get('screenshot')
  async screenshot(@Query() request) {
    await this.playwrightService.screenshot(request.filePath);
  }

  @ApiQuery({ name: 'project', required: true })
  @ApiQuery({ name: 'fileName', required: true })
  @Get('scriptRun')
  async scriptRun(@Query() request) {
    await this.playwrightService.scriptRun(request.project, request.fileName);
  }
  @Get('screenshotIsSameBefore')
  async screenshotIsSameBefore() {
    await this.playwrightService.screenshotIsSameBefore();
  }
}
