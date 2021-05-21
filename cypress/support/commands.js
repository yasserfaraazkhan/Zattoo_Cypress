import 'cypress-wait-until';

const path = require("path");
const COMMAND_DELAY = 500;

/*
* common command to assert element not visible
*/
Cypress.Commands.add('assertElementNotExist', (locator) => {
  return cy.get(`[data-soul=${locator}]`).should('not.exist');
});

/*
* common command to scroll element not visible
*/
Cypress.Commands.add('scrollToElement', (locator) => {
  return cy.get(`[data-soul=${locator}]`).scrollIntoView();
});

/*
* common command to get element and assert visibility
*/
Cypress.Commands.add('isDisplayed', (locator) => {
  return cy.get(`[data-soul=${locator}]`).should('be.visible');
});

/*
* common command to get element 
*/
Cypress.Commands.add('getElement', (locator) => {
  return cy.get(`[data-soul=${locator}]`);
});

/*
* common command to find element from previous element
*/
Cypress.Commands.add('findElementFromPrevious',  { prevSubject: true }, (subject, locator) => {
  return cy.wrap(subject).find(`[data-soul=${locator}]`);
});

/*
* common command to get element and assert text
*/
Cypress.Commands.add('findElementAndAssertText', (locator, textToAssert) => {
  return cy
    .get(`[data-soul=${locator}]`)
    .should('be.visible')
    .invoke('text')
    .then((text) => {
      return text.trim()
    })
    .should('eq', textToAssert);
});

/*
* common command to get element by contains method
* and assert visibility
*/
Cypress.Commands.add('findElementContains', (locator) => {
  return cy.contains(locator).should('be.visible');
});

/**
 * @param {String} element - locator of element
 * @param {String} errorMessage - (optional) custome error message
 * @param {Number} timeOut - (optional) custome timeout quering an element 
 * @param {Number} interval- (optional) custome interval to query an element
 */
Cypress.Commands.add('waitForElementToBePresent', (element, errorMessage, timeOut, interval) => {
  return cy.waitUntil(() => cy.get(element).then($element => $element.length === 1 || Cypress.dom.isAttached($element)), {
    errorMsg: errorMessage || 'timeout waiting for element', // overrides the default error message
    timeout: timeOut || 2000, // waits up to 2000 ms, default to 5000
    interval: interval || 500 // performs the check every 500 ms, default to 200
  });
})
