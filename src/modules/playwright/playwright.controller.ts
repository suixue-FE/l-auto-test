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

  @ApiQuery({ name: 'project', required: true, description: '项目名称' })
  @ApiQuery({ name: 'fileName', required: true, description: '脚本地址' })
  @Get('screenshot')
  async screenshot(@Query() request) {
    return this.playwrightService.getScreenshot(
      request.project,
      request.fileName,
    );
  }

  @ApiQuery({ name: 'project', required: true, description: '项目名称' })
  @ApiQuery({ name: 'fileName', required: true, description: '脚本地址' })
  @Get('scriptRun')
  async scriptRun(@Query() request) {
    return this.playwrightService.scriptRun(request.project, request.fileName);
  }

  @ApiQuery({ name: 'project', required: true, description: '项目名称' })
  @ApiQuery({ name: 'fileName', required: true, description: '脚本地址' })
  @Get('screenshotIsSameBefore')
  async screenshotIsSameBefore(@Query() request) {
    return this.playwrightService.screenshotIsSameBefore(
      request.project,
      request.fileName,
    );
  }
}
