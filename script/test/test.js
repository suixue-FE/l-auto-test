const run = async function (
  option = {
    screenshotUrl: '',
    testName: '',
  },
) {
  const { chromium } = require('playwright');
  const { test, expect } = require('@playwright/test');
  await (async () => {
    const browser = await chromium.launch({ headless: false });
    const context = await browser.newContext();
    const page = await context.newPage();
    try {
      const navigationPromise = page.waitForNavigation();

      await page.goto('https://playwright.dev/docs/why-playwright');

      await page.setViewportSize({ width: 1440, height: 789 });

      await navigationPromise;

      await page.waitForSelector(
        '.sidebar_15mo > .menu > .menu__list > .menu__list-item:nth-child(2) > .menu__link',
      );
      await page.click(
        '.sidebar_15mo > .menu > .menu__list > .menu__list-item:nth-child(2) > .menu__link',
      );

      await page.waitForSelector(
        '.menu__list > .menu__list-item:nth-child(2) > .menu__list > .menu__list-item:nth-child(1) > .menu__link',
      );
      await page.click(
        '.menu__list > .menu__list-item:nth-child(2) > .menu__list > .menu__list-item:nth-child(1) > .menu__link',
      );

      await page.waitForSelector(
        'article > .markdown > ul > li:nth-child(1) > a',
      );
      await page.click('article > .markdown > ul > li:nth-child(1) > a');

      await page.waitForSelector(
        '.tabs-container:nth-child(8) > .margin-vert--md > div:nth-child(1) > .codeBlockContainer_K1bP > .codeBlockContent_hGly > .copyButton_Ue-o',
      );
      await page.click(
        '.tabs-container:nth-child(8) > .margin-vert--md > div:nth-child(1) > .codeBlockContainer_K1bP > .codeBlockContent_hGly > .copyButton_Ue-o',
      );
    } catch (e) {
      throw new Error(`脚本运行错误：${e}`);
    }

    // 逻辑区
    if (option.screenshotUrl) {
      console.log(option.screenshotUrl, '页面截图地址');
      await page.screenshot({ path: `${screenshotUrl}` });
    }
    if (option.testName) {
      console.log(test);
    }

    // 关闭区
    await browser.close();
  })();
};
module.exports = {
  run,
};
