const { Builder, Browser } = require('selenium-webdriver')
const { beforeEach, describe, afterEach, it } = require('mocha')
const assert = require('node:assert')

let driver = null
describe("Evinced Travel", () => {
    beforeEach(async () => {
        driver = await new Builder().forBrowser(Browser.CHROME).build()
        await driver.manage().setTimeouts({implicit: 1000});
        await driver.get("https://demo.evinced.com")
    })

    afterEach(async () => {
        await driver.quit()
    })

    it("should load the page metadata", async () =>{
        let title = "Home | Evinced, Demo site"
        assert.equal(title, await driver.getTitle())
    })
})