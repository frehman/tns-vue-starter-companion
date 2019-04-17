# tns-vue-starter-companion

Companion project to https://github.com/frehman/restful-express-starter

Make sure `restful-express-starter` is running in another space.

Then after running `npm install` after changing into the correct directory, assuming you already have some sort of [NativeScript](https://www.nativescript.org/vue) setup on your mac, run `tns run ios --bundle`.

For unit testing, run `tns test ios --bundle`. Unfortunately, it seems like a test file needs to be modified the first time you run this command. You will then see a message like _TOTAL: 1 SUCCESS_

For e2e tests, run `npm run e2e -- --runType 'sim.iPhone8.Plus' --ignoreDeviceController`. To run an interactive session on the Appium desktop app, use the following in a new session window:

```json
{
  "app": "/Users/_yourpath_/nativescriptstarter/platforms/ios/build/Debug-iphonesimulator/nativescriptstarter.app",
  "platformName": "iOS",
  "platformVersion": 12.2,
  "deviceName": "iPhone 8 Plus",
  "automationName": "XCUITest"
}
```
