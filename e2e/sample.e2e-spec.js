const nsAppium = require('nativescript-dev-appium');
const assert = require('chai').assert;
require('chai').should();

describe('sample scenario', () => {
    let driver;

    before(async () => {
        await nsAppium.startServer();
        driver = await nsAppium.createDriver();
    });

    after(async () => {
        await driver.quit();
        await nsAppium.stopServer();
    });

    afterEach(async function() {
        if (this.currentTest.state === 'failed') {
            await driver.logTestArtifacts(this.currentTest.title);
        }
    });

    it('should find an element by text', async () => {
        const label = await driver.findElementByText(
            'Open',
            nsAppium.SearchOptions.contains
        );

        const text = await label.text();
        assert.isNotNull(text);
        text.should.contain('Drawer');
    });
});
