const { Builder, Browser } = require('selenium-webdriver')
const { beforeEach, describe, afterEach, it } = require('mocha')
const assert = require('node:assert')
const { EvincedSDK, setCredentials } = require('@evinced/js-selenium-sdk/dist/ev-selenium-sdk.bundle.js')

let driver = null
describe("Evinced Travel", () => {
    beforeEach(async () => {
        driver = await new Builder().forBrowser(Browser.CHROME).build()
        const evincedService = await new EvincedSDK(driver)
        await setCredentials({
            serviceId: process.env.AUTH_SERVICE_ID,
            secret: process.env.AUTH_SECRET,
        })
        await driver.manage().setTimeouts({implicit: 1000});
        await driver.get("https://demo.evinced.com")
        const issues = await evincedService.evAnalyze()
        evincedService.evSaveFile(issues, 'json', 'evinced-report.json');
    })

    afterEach(async () => {
        await driver.quit()
    })

    it("should load the page metadata", async () =>{
        let title = "Home | Evinced, Demo site"
        assert.equal(title, await driver.getTitle())
    })
})