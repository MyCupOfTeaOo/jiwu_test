const puppeteer = require('puppeteer');
require('expect-puppeteer');

const fs = require('fs');

const TMP_DIR = 'tmp';

if (!fs.existsSync(TMP_DIR)) {
  fs.mkdirSync(TMP_DIR);
}

// 初始化,防止没有tmp目录

function getPath(name = getCaseName()) {
  return `${TMP_DIR}/${name}.png`;
}

function getCaseName() {
  return expect.getState().currentTestName.split(' ').slice(1).join(' ');
}

async function screenshotPage(page, fullPage = true) {
  const caseName = getCaseName();
  await page.screenshot({
    path: getPath(caseName),
    fullPage: fullPage,
  });
}

describe('http://www.jiwu.com', () => {
  it('YL1-区域切换', async () => {
    await page.goto('http://nj.jiwu.com/');
    const ele = await page.waitForXPath(
      '/html/body/header/div[2]/div[1]/div[3]',
    );
    await ele.click();
    await page.waitForNavigation();
    expect(page.url()).toBe('http://www.jiwu.com/');
    await screenshotPage(page);
  });
  it('YL2-区域二三级子结构点击', async () => {
    await page.goto('http://www.jiwu.com/');
    const ele = await page.waitForXPath('/html/body/div[4]/dl[1]/dd[1]/a[1]');
    const url = await (await ele.getProperty('href')).jsonValue();
    await ele.click();
    await page.waitForNavigation();
    expect(page.url()).toBe(url);
    await screenshotPage(page);
  });
  it('YL3-价格总览数据', async () => {
    const page = await browser.newPage();
    await page.goto('http://nj.jiwu.com/fangjia/');
    const ele = await page.waitForXPath(`/html/body/div[5]/div[1]`);
    await ele.screenshot({
      path: getPath(getCaseName()),
    });
  });
  it('YL4-价格总览文案', async () => {
    const page = await browser.newPage();
    await page.goto('http://nj.jiwu.com/fangjia/');
    const ele = await page.waitForXPath(`/html/body/div[5]/div[1]/div[1]`);
    await ele.screenshot({
      path: getPath(getCaseName()),
    });
  });
  it('YL5-价格总览价格变动按钮', async () => {
    const page = await browser.newPage();
    await page.goto('http://nj.jiwu.com/fangjia/');
    const ele = await page.waitForXPath(
      `/html/body/div[5]/div[1]/div[1]/div[3]`,
    );
    await ele.click();
    await page.$('.pop-box');
    await screenshotPage(page, false);
  });
  it('YL6-房价走势图', async () => {
    const page = await browser.newPage();
    await page.goto('http://nj.jiwu.com/fangjia/');
    const ele = await page.waitForXPath(`/html/body/div[5]/div[1]/div[2]`);
    await page.waitForTimeout(500);
    await ele.screenshot({
      path: getPath(getCaseName()),
    });
  });
  it('YL7-房价走势图鼠标移动', async () => {
    const page = await browser.newPage();
    await page.goto('http://nj.jiwu.com/fangjia/');
    const ele = await page.waitForXPath(`/html/body/div[5]/div[1]/div[2]`);
    const box = await ele.boundingBox();
    await page.mouse.move(box.x + box.width / 2, box.y + box.height / 2);
    await page.waitForTimeout(500);
    await ele.screenshot({
      path: getPath(getCaseName()),
    });
  });
  it('YL8-房价走势图年份切换', async () => {
    const page = await browser.newPage();
    await page.goto('http://nj.jiwu.com/fangjia/');

    const button = await page.waitForXPath(
      `/html/body/div[5]/div[1]/div[2]/div[2]/a[2]`,
    );
    await button.click();
    await page.waitForTimeout(500);
    const ele = await page.waitForXPath(`/html/body/div[5]/div[1]/div[2]`);
    await ele.screenshot({
      path: getPath(getCaseName()),
    });
  });
  it('YL9-房价地图新房统计', async () => {
    const page = await browser.newPage();
    await page.goto('http://nj.jiwu.com/fangjia/');
    const ele = await page.waitForXPath(`/html/body/div[5]/div[1]/div[2]`);
    const box = await ele.boundingBox();
    await page.waitForTimeout(500);
    await page.mouse.click(box.x + box.width / 2 + 30, box.y + box.height - 10);
    await page.waitForTimeout(500);
    await ele.screenshot({
      path: getPath(getCaseName()),
    });
  });
  it('YL10-房价地图二手房统计', async () => {
    const page = await browser.newPage();
    await page.goto('http://nj.jiwu.com/fangjia/');
    const ele = await page.waitForXPath(`/html/body/div[5]/div[1]/div[2]`);
    const box = await ele.boundingBox();
    await page.waitForTimeout(500);
    await page.mouse.click(box.x + box.width / 2 - 30, box.y + box.height - 10);
    await page.waitForTimeout(500);
    await ele.screenshot({
      path: getPath(getCaseName()),
    });
  });

  it('YL11-区域房价排行新房二手房切换', async () => {
    const page = await browser.newPage();
    await page.goto('http://nj.jiwu.com/fangjia/');

    const button = await page.waitForXPath(
      `/html/body/div[5]/div[1]/div[4]/div[2]/a[2]`,
    );
    await button.click();
    await page.waitForTimeout(500);
    const ele = await page.waitForXPath(`/html/body/div[5]/div[1]/div[4]`);
    await ele.screenshot({
      path: getPath(getCaseName()),
    });
  });
  it('YL12-区域房价排行区域跳转', async () => {
    const page = await browser.newPage();
    await page.goto('http://nj.jiwu.com/fangjia/');

    const button = await page.waitForXPath(
      `/html/body/div[5]/div[1]/div[4]/div[3]/div[1]/ul/li[2]/span[2]/a`,
    );
    const url = await (await button.getProperty('href')).jsonValue();
    await button.click();
    await page.waitForNavigation();
    expect(page.url()).toBe(url);
    await page.waitForTimeout(500);
    await screenshotPage(page);
  });
  it('YL13-区域房价排行更多按钮', async () => {
    const page = await browser.newPage();
    await page.goto('http://nj.jiwu.com/fangjia/');

    const button = await page.waitForXPath(
      `/html/body/div[5]/div[1]/div[4]/div[3]/div[1]/a`,
    );
    await button.click();
    await page.waitForTimeout(100);
    const ele = await page.waitForXPath(`/html/body/div[5]/div[1]/div[4]`);
    await ele.screenshot({
      path: getPath(getCaseName()),
    });
  });
  it('YL14-区域在售楼盘排行新房二手房切换', async () => {
    const page = await browser.newPage();
    await page.goto('http://nj.jiwu.com/fangjia/');

    const button = await page.waitForXPath(
      `/html/body/div[5]/div[1]/div[5]/div[2]/a[2]`,
    );
    await button.click();
    await page.waitForTimeout(500);
    const ele = await page.waitForXPath(`/html/body/div[5]/div[1]/div[5]`);
    await ele.screenshot({
      path: getPath(getCaseName()),
    });
  });
  it('YL15-区域在售楼盘排行区域跳转', async () => {
    const page = await browser.newPage();
    await page.goto('http://nj.jiwu.com/fangjia/');

    const button = await page.waitForXPath(
      `/html/body/div[5]/div[1]/div[5]/div[3]/div[1]/ul/li[2]/span[2]/a`,
    );
    const url = await (await button.getProperty('href')).jsonValue();
    await button.click();
    await page.waitForNavigation();
    expect(page.url()).toBe(url);
    await page.waitForTimeout(500);
    await screenshotPage(page);
  });
  it('YL16-区域在售楼盘排行更多按钮', async () => {
    const page = await browser.newPage();
    await page.goto('http://nj.jiwu.com/fangjia/');

    const button = await page.waitForXPath(
      `/html/body/div[5]/div[1]/div[5]/div[3]/div[1]/a`,
    );
    await button.click();
    await page.waitForTimeout(100);
    const ele = await page.waitForXPath(`/html/body/div[5]/div[1]/div[5]`);
    await ele.screenshot({
      path: getPath(getCaseName()),
    });
  });

  it('YL17-价格分布趋势图', async () => {
    const page = await browser.newPage();
    await page.goto('http://nj.jiwu.com/fangjia/');
    const ele = await page.waitForXPath('/html/body/div[5]/div[1]/div[6]');
    await page.waitForTimeout(500);
    await ele.screenshot({
      path: getPath(),
    });
  });
  it('YL18-价格分布新房二手房切换', async () => {
    const page = await browser.newPage();
    await page.goto('http://nj.jiwu.com/fangjia/');
    const ele = await page.waitForXPath('/html/body/div[5]/div[1]/div[6]');
    const button = await page.waitForXPath(
      '/html/body/div[5]/div[1]/div[6]/div[2]/a[2]',
    );
    await button.click();
    await page.waitForTimeout(500);
    await ele.screenshot({
      path: getPath(),
    });
  });
  it('YL19-二手房成交信息展示数据', async () => {
    const page = await browser.newPage();
    await page.goto('http://nj.jiwu.com/fangjia/');
    const ele = await page.waitForXPath('/html/body/div[5]/div[1]/div[7]');
    await ele.screenshot({
      path: getPath(),
    });
  });
  it('YL20-二手房成交信息查看更多跳转', async () => {
    const page = await browser.newPage();
    await page.goto('http://nj.jiwu.com/fangjia/');
    const button = await page.waitForXPath(
      '/html/body/div[5]/div[1]/div[7]/div[1]/a',
    );
    await button.click();
    await page.waitForNavigation();
    await screenshotPage(page);
  });
  it('YL21-二手房成交信息翻页', async () => {
    const page = await browser.newPage();
    await page.goto('http://nj.jiwu.com/jilu/');
    const button = await page.waitForXPath('//*[@id="pagination"]/div/a[4]');
    await button.click();
    await page.waitForNavigation();
    await screenshotPage(page);
  });
  it('YL22-房产快讯', async () => {
    const page = await browser.newPage();
    await page.goto('http://nj.jiwu.com/fangjia/');
    const ele = await page.waitForXPath('/html/body/div[5]/div[2]/div[1]');
    await ele.screenshot({
      path: getPath(),
    });
  });
  it('YL23-房产快讯鼠标移动高亮', async () => {
    const page = await browser.newPage();
    await page.goto('http://nj.jiwu.com/fangjia/');
    const ele = await page.waitForXPath('/html/body/div[5]/div[2]/div[1]');
    const button = await page.waitForXPath(
      '/html/body/div[5]/div[2]/div[1]/ul/li[1]/a',
    );
    const box = await button.boundingBox();
    await page.mouse.move(box.x + box.width / 2, box.y + box.height / 2);
    await ele.screenshot({
      path: getPath(),
    });
  });
  it('YL24-房产快讯点击跳转', async () => {
    const page = await browser.newPage();
    await page.goto('http://nj.jiwu.com/fangjia/');
    const button = await page.waitForXPath(
      '/html/body/div[5]/div[2]/div[1]/ul/li[1]/a',
    );
    const url = await (await button.getProperty('href')).jsonValue();
    await page.goto(url);
    await screenshotPage(page);
  });

  it('YL25-优选新房文案', async () => {
    const page = await browser.newPage();
    await page.goto('http://nj.jiwu.com/fangjia/');
    const ele = await page.waitForXPath('/html/body/div[5]/div[2]/div[2]');
    await ele.screenshot({
      path: getPath(),
    });
  });
  it('YL26-优选新房查看全局', async () => {
    const page = await browser.newPage();
    await page.goto('http://nj.jiwu.com/fangjia/');
    const button = await page.waitForXPath(
      '/html/body/div[5]/div[2]/div[2]/div/a',
    );
    await button.click();
    await page.waitForNavigation();
    await screenshotPage(page);
  });
  it('YL27-优选新房详细页', async () => {
    const page = await browser.newPage();
    await page.goto('http://nj.jiwu.com/fangjia/');
    const button = await page.waitForXPath(
      '/html/body/div[5]/div[2]/div[2]/ul/li[1]/a',
    );
    const url = await (await button.getProperty('href')).jsonValue();
    await page.goto(url);
    await screenshotPage(page);
  });
  it('YL28-优选新房详情页缩略图', async () => {
    const page = await browser.newPage();
    await page.goto('http://nj.jiwu.com/fangjia/');
    const button = await page.waitForXPath(
      '/html/body/div[5]/div[2]/div[2]/ul/li[1]/a',
    );
    const url = await (await button.getProperty('href')).jsonValue();
    await page.goto(url);
    const thumb = await page.waitForXPath(
      `//*[@id="lpan_banner"]/div[2]/div[3]`,
    );
    await thumb.screenshot({
      path: getPath(),
    });
  });
  it('YL29-优选新房详情页缩略图点击切换', async () => {
    const page = await browser.newPage();
    await page.goto('http://nj.jiwu.com/fangjia/');
    const button = await page.waitForXPath(
      '/html/body/div[5]/div[2]/div[2]/ul/li[1]/a',
    );
    const url = await (await button.getProperty('href')).jsonValue();
    await page.goto(url);
    const thumbButton = await page.waitForXPath(
      `//*[@id="lpan_banner"]/div[2]/div[3]/ul/li[2]/img`,
    );
    await thumbButton.click();
    const ele = await page.waitForXPath(`//*[@id="lpan_banner"]`);
    await ele.screenshot({
      path: getPath(),
    });
  });
  it('YL30-优选二手房文案', async () => {
    const page = await browser.newPage();
    await page.goto('http://nj.jiwu.com/fangjia/');
    const ele = await page.waitForXPath('/html/body/div[5]/div[2]/div[3]');
    await ele.screenshot({
      path: getPath(),
    });
  });
  it('YL31-优选二手房查看全部', async () => {
    const page = await browser.newPage();
    await page.goto('http://nj.jiwu.com/fangjia/');
    const button = await page.waitForXPath(
      '/html/body/div[5]/div[2]/div[3]/div/a',
    );
    await button.click();
    await page.waitForNavigation();
    await screenshotPage(page);
  });
  it('YL32-优选二手房详细页', async () => {
    const page = await browser.newPage();
    await page.goto('http://nj.jiwu.com/fangjia/');
    const button = await page.waitForXPath(
      '/html/body/div[5]/div[2]/div[3]/ul/li[1]/a',
    );
    const url = await (await button.getProperty('href')).jsonValue();
    await page.goto(url);
    await screenshotPage(page);
  });
  it('YL33-优选二手房缩略图', async () => {
    const page = await browser.newPage();
    await page.goto('http://nj.jiwu.com/fangjia/');
    const button = await page.waitForXPath(
      '/html/body/div[5]/div[2]/div[3]/ul/li[1]/a',
    );
    const url = await (await button.getProperty('href')).jsonValue();
    await page.goto(url);
    const thumb = await page.waitForXPath(`//*[@id="imgs-box"]/div[2]/div[2]`);
    await thumb.screenshot({
      path: getPath(),
    });
  });
  it('YL34-优选二手房详情页缩略图点击切换', async () => {
    const page = await browser.newPage();
    await page.goto('http://nj.jiwu.com/fangjia/');
    const button = await page.waitForXPath(
      '/html/body/div[5]/div[2]/div[3]/ul/li[1]/a',
    );
    const url = await (await button.getProperty('href')).jsonValue();
    await page.goto(url);
    const thumbButton = await page.waitForXPath(
      `//*[@id="imgs-box"]/div[2]/div[2]/div/ul/li[2]/a/img`,
    );
    await thumbButton.click();
    // 等待 effect 效果
    await page.waitForTimeout(200);
    const ele = await page.waitForXPath(
      '/html/body/div[3]/div[1]/div[2]/div[1]/div[1]/div',
    );
    await ele.screenshot({
      path: getPath(),
    });
  });

  it('YL35-优选二手房关注房源', async () => {
    const page = await browser.newPage();
    await page.goto('http://nj.jiwu.com/fangjia/');
    const link = await page.waitForXPath(
      '/html/body/div[5]/div[2]/div[3]/ul/li[1]/a',
    );
    const url = await (await link.getProperty('href')).jsonValue();
    await page.goto(url);

    const button = await page.waitForXPath(
      '/html/body/div[3]/div[1]/div[1]/div[2]/span[1]/a',
    );
    await button.click();
    const modal = await page.$('.pop-wrap');
    const title = await page.evaluate(
      (ele) => ele.textContent,
      await modal.$('.tit'),
    );
    await screenshotPage(page, false);
    expect(title).toBe('关注房源');
  });
  it('YL36-优选二手房获取底价', async () => {
    const page = await browser.newPage();
    await page.goto('http://nj.jiwu.com/fangjia/');
    const link = await page.waitForXPath(
      '/html/body/div[5]/div[2]/div[3]/ul/li[1]/a',
    );
    const url = await (await link.getProperty('href')).jsonValue();
    await page.goto(url);

    const button = await page.waitForXPath(
      '/html/body/div[3]/div[1]/div[1]/div[2]/span[2]/a',
    );
    await button.click();
    const modal = await page.$('.pop-wrap');
    const title = await page.evaluate(
      (ele) => ele.textContent,
      await modal.$('.tit'),
    );
    await screenshotPage(page, false);
    expect(title).toBe('获取底价');
  });
  it('YL37-优选二手房预约看房', async () => {
    const page = await browser.newPage();
    await page.goto('http://nj.jiwu.com/fangjia/');
    const link = await page.waitForXPath(
      '/html/body/div[5]/div[2]/div[3]/ul/li[1]/a',
    );
    const url = await (await link.getProperty('href')).jsonValue();
    await page.goto(url);

    const button = await page.waitForXPath(
      '/html/body/div[3]/div[1]/div[2]/div[2]/div[1]/ul[2]/li[4]/a',
    );
    await button.click();
    const modal = await page.$('.pop-wrap');
    const title = await page.evaluate(
      (ele) => ele.textContent,
      await modal.$('.tit'),
    );
    await screenshotPage(page, false);
    expect(title).toBe('预约看房');
  });

  it('YL38-置业管家顾问信息', async () => {
    const page = await browser.newPage();
    await page.goto('http://suzhou.jiwu.com/zygj/');
    await screenshotPage(page);
  });
  it('YL39-置业管家跳转信息详细页', async () => {
    const page = await browser.newPage();
    await page.goto('http://suzhou.jiwu.com/zygj/');
    const button = await page.waitForXPath(
      '/html/body/div[2]/div/div[1]/div[1]/ul/li[1]/div[1]/p[1]/a[1]',
    );
    await button.click();
    await page.waitForNavigation();
    await screenshotPage(page);
  });
  it('YL40-置业管家咨询按键', async () => {
    const page = await browser.newPage();
    await page.goto('http://suzhou.jiwu.com/zygj/');
    const button = await page.waitForXPath(
      '/html/body/div[2]/div/div[1]/div[1]/ul/li[1]/div[1]/p[1]/a[1]',
    );
    await button.click();
    await page.waitForNavigation();
    const zixunButton = await page.waitForXPath(
      '/html/body/div[3]/div[1]/div[1]/div/div[1]/a',
    );
    await page.$eval('.panel-login', (ele) => {
      return ele.style.display === 'none';
    });
    await zixunButton.click();
    await page.$eval('.panel-login', (ele) => {
      return ele.style.display !== 'none';
    });
    await screenshotPage(page, false);
  });
  it('YL41-置业管家滚动条信息', async () => {
    const page = await browser.newPage();
    await page.goto('http://suzhou.jiwu.com/zygj/');
    const button = await page.waitForXPath(
      '/html/body/div[2]/div/div[1]/div[1]/ul/li[1]/div[1]/p[1]/a[1]',
    );
    await button.click();
    await page.waitForNavigation();
    const dynamicInfo = await page.waitForXPath(
      '/html/body/div[3]/div[1]/div[2]/div',
    );
    await dynamicInfo.screenshot({
      path: getPath(`${getCaseName()}-滚动前`),
    });
    const box = await dynamicInfo.boundingBox();
    // 展示滚动条
    await page.mouse.move(box.x + box.width / 2, box.y + box.height / 2);
    // 按十次空格滚动
    await Promise.all(
      [...Array(10)].map(() => {
        page.keyboard.press('Space');
      }),
    );
    await dynamicInfo.screenshot({
      path: getPath(),
    });
  });
});
