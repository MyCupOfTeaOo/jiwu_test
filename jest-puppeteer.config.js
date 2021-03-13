module.exports = {
  launch: {
    headless: process.env.UNHEADLESS ? false : true,
    defaultViewport: {
      width: 1920,
      height: 1080,
    },
    args: [
      '--disable-gpu',
      '--disable-dev-shm-usage',
      '--no-first-run',
      '--no-zygote',
      '--no-sandbox',
      '--start-maximized',
    ],
  },
};
