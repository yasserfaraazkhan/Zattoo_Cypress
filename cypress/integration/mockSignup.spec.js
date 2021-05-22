import { registrationPage } from '../support/helpers/pages/registrationPage';
import { testData } from '../support/helpers/TestData/generateData';
import { apiEndpoint } from '../apiHelpers/endpointList';

describe("Zatto's Availability in not other countries", () => {

    /**
     * Since Zattoo is not available in India, the signup page will not be available to anyone.
     * Mocking these 4 request, So that, Zattoo Evaluates us being in DE and Navigating to the signpu page.
     * In the response, I can add or remove channels/catalog items to test.
     */
    it('should be able to navigate to signup page when session requests are mocked', () => {
        cy.intercept(apiEndpoint.consent, { fixture: 'consent.json' }).as('consent');
        cy.intercept(apiEndpoint.hello, { fixture: 'hello.json' }).as('hello');
        cy.intercept(apiEndpoint.channels, { fixture: 'channels.json' }).as('channels');
        cy.intercept(apiEndpoint.catalogs, { fixture: 'catalogs.json' }).as('catalogs');

        registrationPage
            .navigateToSignUpPage()
            .enterNewUserDetails(testData.getNewUser());

    });

    it('should show not available in current country error message when session requests are not mocked', () => {

        registrationPage
            .assertZattooUnAvailableMessageDisplayed();

    });


})
