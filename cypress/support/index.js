import "./commands";
import addContext from 'mochawesome/addContext';
import 'cypress-mochawesome-reporter/register';

const titleToFileName = (title) => title.replace(/[:\/]/g, '');

// To avoide scripts/async requests that fail with an uncaught exception error
Cypress.on("uncaught:exception", (err, runnable) => {
  return false;
});

Cypress.on('test:after:run', (test, runnable) => {
  if (test.state === 'failed') {
    const screenshot = `${titleToFileName(runnable.parent.title)} -- ${titleToFileName(test.title)} (failed).png`;
    addContext({ test }, screenshot);
  }
});
