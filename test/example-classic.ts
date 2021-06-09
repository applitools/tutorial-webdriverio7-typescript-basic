'use strict';

import { ClassicRunner, Eyes } from '@applitools/eyes-webdriverio';
import { remote, RemoteOptions } from 'webdriverio';

let browser: WebdriverIO.Browser;
let eyes: Eyes;

describe('wdio5', function () {
  beforeEach(async () => {
    // Use chrome browser

    browser = await remote({
      capabilities: {
        browserName: 'chrome',
        'goog:chromeOptions': {
          headless: true,
        },
      },
      logLevel: 'silent',
    } as RemoteOptions);

    // Initialize the Runner for your test.
    const runner = new ClassicRunner();

    // Initialize the eyes SDK with configuration
    eyes = new Eyes(runner, {
      batch: {
        name: 'Demo Batch - WDIO 7 - Ultrafast TS',
      },
    });
  });

  it('Classic Runner Test', async () => {
    // Start the test by setting AUT's name, test name and viewport size (width X height)
    await eyes.open(browser, {
      appName: 'Demo App - WDIO 7 - Ultrafast TS',
      testName: 'Smoke Test - WDIO 7 - Ultrafast TS',
      viewportSize: {
        width: 800,
        height: 600,
      },
    });

    // Navigate the browser to the "ACME" demo app.
    await browser.url('https://demo.applitools.com');

    // To see visual bugs after the first run, use the commented line below instead.
    // await driver.url("https://demo.applitools.com/index_v2.html");

    // Visual checkpoint #1.
    await eyes.check({ name: 'Login Window', fully: true });

    // Click the "Log in" button.
    const loginButton = await browser.$('#log-in');
    await loginButton.click();

    // Visual checkpoint #2.
    await eyes.check({ name: 'App Window', fully: true });

    // End the test
    await eyes.close(true);
  });

  afterEach(async () => {
    // Close the browser
    await browser.deleteSession();

    // If the test was aborted before eyes.close was called, ends the test as aborted.
    await eyes.abort();
  });
});
