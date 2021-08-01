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

      await page.goto('https://playwright.dev/');

      await page.setViewportSize({ width: 1440, height: 789 });

      await navigationPromise;

      await page.waitForSelector(
        '.main-wrapper > .hero > .container > .buttons_1r9m > .getStarted_1iQB',
      );
      await page.click(
        '.main-wrapper > .hero > .container > .buttons_1r9m > .getStarted_1iQB',
      );

      await page.waitForSelector(
        'article > .markdown > .codeBlockContainer_K1bP:nth-child(10) > .codeBlockContent_hGly > .copyButton_Ue-o',
      );
      await page.click(
        'article > .markdown > .codeBlockContainer_K1bP:nth-child(10) > .codeBlockContent_hGly > .copyButton_Ue-o',
      );
    } catch (e) {
      console.log(e, 11111);
      throw new Error(`脚本运行错误：${e}`);
    }
    console.log(option);
    // 逻辑区
    if (option.screenshotUrl) {
      await page.screenshot({ path: `${option.screenshotUrl}` });
    }
    if (option.testName) {
      test('Test login page @fast', async ({ page }) => {
        expect(
          await page.textContent(
            'article > .markdown > .codeBlockContainer_K1bP:nth-child(10) > .codeBlockContent_hGly > .copyButton_Ue-o',
          ),
        ).toBe('Copied');
      });
      console.log(
        await page.textContent(
          'article > .markdown > .codeBlockContainer_K1bP:nth-child(10) > .codeBlockContent_hGly > .copyButton_Ue-o',
        ),
        111111,
      );
    }

    // 关闭区
    await browser.close();
  })();
};
module.exports = {
  run,
};
