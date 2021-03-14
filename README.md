吉屋网测试

# 准备环境

需要准备

- nodejs v14.1.0

# 安装依赖

```bash
> npx cross-env PUPPETEER_DOWNLOAD_HOST=https://storage.googleapis.com.cnpmjs.org npm i -S puppeteer
```

# 执行测试

```bash
> npx jest
```

# 测试结果

```bash
 PASS  tests/jiwu.test.js (70.312 s)
  http://www.jiwu.com
    √ YL1-区域切换 (3989 ms)
    √ YL2-区域二三级子结构点击 (2681 ms)
    √ YL3-价格总览数据 (1356 ms)
    √ YL4-价格总览文案 (804 ms)
    √ YL5-价格总览价格变动按钮 (1106 ms)
    √ YL6-房价走势图 (1279 ms)
    √ YL7-房价走势图鼠标移动 (1285 ms)
    √ YL8-房价走势图年份切换 (1321 ms)
    √ YL9-房价地图新房统计 (1768 ms)
    √ YL10-房价地图二手房统计 (1780 ms)
    √ YL11-区域房价排行新房二手房切换 (1344 ms)
    √ YL12-区域房价排行区域跳转 (1846 ms)
    √ YL13-区域房价排行更多按钮 (937 ms)
    √ YL14-区域在售楼盘排行新房二手房切换 (1307 ms)
    √ YL15-区域在售楼盘排行区域跳转 (2422 ms)
    √ YL16-区域在售楼盘排行更多按钮 (1103 ms)
    √ YL17-价格分布趋势图 (1342 ms)
    √ YL18-价格分布新房二手房切换 (1325 ms)
    √ YL19-二手房成交信息展示数据 (783 ms)
    √ YL20-二手房成交信息查看更多跳转 (1185 ms)
    √ YL21-二手房成交信息翻页 (688 ms)
    √ YL22-房产快讯 (760 ms)
    √ YL23-房产快讯鼠标移动高亮 (772 ms)
    √ YL24-房产快讯点击跳转 (2561 ms)
    √ YL25-优选新房文案 (779 ms)
    √ YL26-优选新房查看全局 (1868 ms)
    √ YL27-优选新房详细页 (2801 ms)
    √ YL28-优选新房详情页缩略图 (1614 ms)
    √ YL29-优选新房详情页缩略图点击切换 (1668 ms)
    √ YL30-优选二手房文案 (787 ms)
    √ YL31-优选二手房查看全部 (2011 ms)
    √ YL32-优选二手房详细页 (5794 ms)
    √ YL33-优选二手房缩略图 (1400 ms)
    √ YL34-优选二手房详情页缩略图点击切换 (1723 ms)
    √ YL35-优选二手房关注房源 (2555 ms)
    √ YL36-优选二手房获取底价 (1675 ms)
    √ YL37-优选二手房预约看房 (1645 ms)
    √ YL38-置业管家顾问信息 (1575 ms)
    √ YL39-置业管家跳转信息详细页 (2276 ms)
    √ YL40-置业管家咨询按键 (1963 ms)
    √ YL41-置业管家滚动条信息 (1707 ms)

Test Suites: 1 passed, 1 total
Tests:       41 passed, 41 total
Snapshots:   0 total
Time:        70.501 s, estimated 89 s
Ran all test suites.
```

> 测试截图全部在项目的 `tmp`目录下
