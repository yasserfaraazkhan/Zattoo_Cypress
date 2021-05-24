/// <reference types="cypress" />

/**
 * @type {Cypress.PluginConfig}
 */
// eslint-disable-next-line no-unused-vars

const {
  addMatchImageSnapshotPlugin,
} = require('cypress-image-snapshot/plugin');

module.exports = (on, config) => {
  require('cypress-mochawesome-reporter/plugin')(on);
  addMatchImageSnapshotPlugin(on, config);

  on('before:browser:launch', (browser = {}, args) => {
    args.push('--disable-search-geolocation-disclosure');
    return args;
  })
  on('before:browser:launch', (browser = {}, launchOptions) => {
    if (browser.name === 'chrome' || browser.name === 'edge') {
      launchOptions.args.push('--disable-features=SameSiteByDefaultCookies') // bypass 401 unauthorised access on chromium-based browsers
      return launchOptions
    }
  })
}
