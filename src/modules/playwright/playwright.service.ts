import { Injectable } from '@nestjs/common';
// import { webkit, Page } from 'playwright';
import { createDiff } from 'looks-same';
import { RCode } from '../../common/constant/rcode';
// const fs = require('fs');
@Injectable()
export class PlaywrightService {
  async getScreenshot(
    project: string,
    fileName: string,
    imageName = 'example.png',
  ) {
    const scriptFn = require(`../../../script/${project}/${fileName}`);
    try {
      await scriptFn.run(imageName);
      return {
        data: imageName,
        code: RCode.OK,
        msg: '获取成功',
      };
    } catch (e) {
      return { code: RCode.ERROR, msg: '脚本运行失败', data: '' };
    }
  }

  /**
   * 执行脚本
   * @param project 项目名称
   * @param fileName 脚本名称
   */
  async scriptRun(project: string, fileName: string): Promise<void> {
    const scriptFn = require(`../../../script/${project}/${fileName}`);
    await scriptFn.run();
  }

  /**
   * diff图片结果
   * @param filePath1 图片1
   * @param filePath2 图片2
   * @returns
   */
  isSame(filePath1: string, filePath2: string): Promise<boolean> {
    return new Promise((resolve) => {
      createDiff(
        {
          reference: filePath1,
          current: filePath2,
          antialiasingTolerance: 3,
          diff: 'to.png',
          highlightColor: '#ff00ff', // color to highlight the differences
        },
        function (error: any) {
          console.log(error);
          resolve(true);
        },
      );
    });
  }
  async screenshotIsSameBefore(project: string, fileName: string) {
    // const str2 = await this.screenshot('example2.png');
    await this.getScreenshot(project, fileName, 'example2.png');
    const str2 = 'example2.png';
    return this.isSame('example.png', str2);
  }
}
