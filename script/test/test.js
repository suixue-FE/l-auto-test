module.exports.do = async function () {
  const { chromium } = require('playwright');
  await (async () => {
    const browser = await chromium.launch({ headless: false });
    const context = await browser.newContext();
    const page = await context.newPage();

    const navigationPromise = page.waitForNavigation();

    await page.goto('https://playwright.dev/docs/release-notes/');

    await page.setViewportSize({ width: 1920, height: 969 });

    await navigationPromise;

    await page.waitForSelector(
      '.menu__list > .menu__list-item:nth-child(2) > .menu__list > .menu__list-item:nth-child(1) > .menu__link',
    );
    await page.click(
      '.menu__list > .menu__list-item:nth-child(2) > .menu__list > .menu__list-item:nth-child(1) > .menu__link',
    );

    await page.waitForSelector(
      '.menu__list > .menu__list-item:nth-child(2) > .menu__list > .menu__list-item:nth-child(3) > .menu__link',
    );
    await page.click(
      '.menu__list > .menu__list-item:nth-child(2) > .menu__list > .menu__list-item:nth-child(3) > .menu__link',
    );

    await page.waitForSelector(
      '.sidebar_15mo > .menu > .menu__list > .menu__list-item:nth-child(2) > .menu__list',
    );
    await page.click(
      '.sidebar_15mo > .menu > .menu__list > .menu__list-item:nth-child(2) > .menu__list',
    );

    await page.waitForSelector(
      '.menu__list > .menu__list-item:nth-child(2) > .menu__list > .menu__list-item:nth-child(5) > .menu__link',
    );
    await page.click(
      '.menu__list > .menu__list-item:nth-child(2) > .menu__list > .menu__list-item:nth-child(5) > .menu__link',
    );

    await browser.close();
  })();
};
