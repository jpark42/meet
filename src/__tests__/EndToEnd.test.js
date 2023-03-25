//The browser renders the components using puppetter, so it is not necessary to import from enzyme to render components anymore
  //However, the app has to be running in order to test. "npm run start"
import puppeteer from 'puppeteer';
//bug with puppeteer due to versioning? Getting an error stating "Cannot find module from node_modules". Need to use older version of puppeteer? 18.1.0? 

describe('show/hide an event details', () => {
  let browser;
  let page;
  jest.setTimeout(30000);
  beforeAll(async () => {
    browser = await puppeteer.launch({
      //recommended to keep 'headless' mode on, until the very end. Takes alot longer to implement and run end-to-end tests when turned off
      headless: true,
      slowMo: 250, //slow down by 250ms
      ignoreDefaultArgs: ['--disable-extensions'] //ignores default setting that causes timeout errors
    });
    page = await browser.newPage();
    await page.goto('http://localhost:3000/');
    //need to wait for the event component to laod first before being able to test, since this is testing the event show/hide functionality
    await page.waitForSelector('.event');
  });

  afterAll(() => {
    browser.close();
  });

  test('An event element is collapsed by default', async () => {
    // page.$(selector) runs very similarly to document.querySelector(selector) for selecting an element on the page
    const eventDetails = await page.$('.event .event__Details');
    expect(eventDetails).toBeNull();
  });

  test('User can expand an event to see its details', async () => {
    //simulate the user clicking the event 'Details' button
    await page.click('.event .details-button');
    //load event details
    const eventDetails = await page.$('.event .event__Details');
    //eventDetails uses .toBeDefined() matcher instead of toBeNull() because we want the details to exist here
    expect(eventDetails).toBeDefined();
  });

  test('User can collapse an event to hide its details', async () => {
    await page.click('.event .hide-details-button');
    const eventDetails = await page.$('.event .event__Details');
    //.toBeNull() matcher is being used again to make sure the extra event details no longer exist
    expect(eventDetails).toBeNull();
  });
});