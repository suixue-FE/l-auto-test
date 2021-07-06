import { Injectable } from '@nestjs/common';
import { webkit } from 'playwright';
import { createDiff } from 'looks-same';
// const fs = require('fs');
@Injectable()
export class PlaywrightService {
  async screenshot(output: string): Promise<string> {
    const browser = await webkit.launch();
    const page = await browser.newPage();
    await page.goto('http://whatsmyuseragent.org/');
    await page.screenshot({ path: `${output}` });
    await browser.close();
    return output;
  }
  async scriptRun(project: string, fileName: string): Promise<void> {
    // if (project&&fileName) {

    // }
    const scriptFn = require(`../../../script/${project}/${fileName}`);
    console.log(scriptFn);
    await scriptFn.do();
  }
  isSame(filePath1: string, filePath2: string): Promise<boolean> {
    return new Promise((resolve, reject) => {
      console.log(createDiff);

      createDiff(
        {
          reference: filePath1,
          current: filePath2,
          diff: 'to.png',
          highlightColor: '#ff00ff', // color to highlight the differences
        },
        function (error: any) {
          console.log(error);
          resolve(true);
        },
      );

      // lookSame(
      //   filePath1,
      //   filePath2,
      //   { pixelRatio: 2 },
      //   function (error, { equal }) {
      //     resolve(equal);
      //   },
      // );
    });
  }
  async screenshotIsSameBefore() {
    const str2 = await this.screenshot('example2.png');
    return this.isSame('example.png', str2);
  }
}
