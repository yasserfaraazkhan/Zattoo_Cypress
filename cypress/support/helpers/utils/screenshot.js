class Screenshot {


blackout = locator => cy.getElement(locator).invoke('css', 'display', 'none');
blackoutLocator = locator => cy.get(locator).invoke('css', 'display', 'none');

locator = locator =>
  cy
    .wait(500)
    .get(locator)
    .matchImageSnapshot({ failureThreshold: 0.1 });

compare = locator =>
  cy
    .wait(1000)
    .getElement(locator)
    .first()
    .should('be.visible')
    .then(() => {
      cy
        .getElement(locator)
        .first()
        .matchImageSnapshot({ failureThreshold: 0.1 });
    });

getElement = locator =>
  cy
    .wait(500)
    .getElement(locator)
    .matchImageSnapshot({ failureThreshold: 0.1 });

diff = locator =>
  cy
    .wait(1000)
    .get(locator)
    .first()
    .matchImageSnapshot({ failureThreshold: 0.1 });

filter = cssClass =>
  cy
    .get(cssClass)
    .last()
    .matchImageSnapshot({ failureThreshold: 0.1 });

homeCards = (locator, indexOfCards) =>
  cy
    .wait(500)
    .getElement(locator)
    .eq(indexOfCards)
    .matchImageSnapshot({ failureThreshold: 0.1 });

navBar = (locator, cssClass) =>
  cy
    .getElement(locator)
    .find(cssClass)
    .first()
    .matchImageSnapshot({ failureThreshold: 0.1 });

}
export const screenshot = new Screenshot();
