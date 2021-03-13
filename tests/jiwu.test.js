const puppeteer = require('puppeteer');
require('expect-puppeteer');

const fs = require('fs');

const TMP_DIR = 'tmp';

if (!fs.existsSync(TMP_DIR)) {
  fs.mkdirSync(TMP_DIR);
}

// 初始化,防止没有tmp目录

function getPath(name) {
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

  it('YL17-置业管家顾问信息', async () => {});
  it('YL18-置业管家跳转信息详细页', async () => {});
  it('YL19-置业管家咨询按键', async () => {});
  it('YL20-置业管家滚动条信息', async () => {});

  it('YL21-价格分布文案', async () => {});
  it('YL22-价格分布数据', async () => {});
  it('YL23-价格分布年份切换', async () => {});
  it('YL24-价格分布新房二手房切换', async () => {});
  it('YL25-价格分布趋势图', async () => {});
  it('YL26-二手房成交信息展示数据', async () => {});
  it('YL27-二手房成交信息跳转', async () => {});
  it('YL28-房产快讯文案', async () => {});
  it('YL29-房产快讯显示', async () => {});
  it('YL30-房产快讯和详细页区别', async () => {});
  it('YL31-房产快讯点击跳转', async () => {});
  it('YL32-房产快讯鼠标移动高亮', async () => {});
  it('YL33-优选新房文案', async () => {});
  it('YL34-优选新房显示', async () => {});
  it('YL35-优选新房和详细页区别', async () => {});
  it('YL36-优选新房蹄片缩略图', async () => {});
  it('YL37-优选新房缩略图标签', async () => {});
  it('YL38-优选新房按钮', async () => {});
  it('YL39-优选新房点击', async () => {});
  it('YL40-优选二手房文案', async () => {});
  it('YL41-优选二手房显示', async () => {});
  it('YL42-优选二手房和详细页区别', async () => {});
  it('YL43-优选二手房图片缩略图线', async () => {});
  it('YL44-优选二手房按钮', async () => {});
  it('YL45-优选二手房点击', async () => {});
  it('YL46-下载链接文案', async () => {});
  it('YL47-下载链接跳转下载页面', async () => {});
});
