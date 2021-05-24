import { loginPage } from '../../support/helpers/pages/loginPage';
import { testData } from '../../support/helpers/TestData/generateData';
import { screenshot } from '../../support/helpers/utils/screenshot';

describe("Cypress Visual Testing - Login page", () => {

    beforeEach(() => {
        loginPage.navigateToLoginPage()
    })

    it('should compare snapshot of login page elements', () => {

        loginPage.enterLoginDetails(testData.getSpecialCharDeatils());
        screenshot.compare(loginPage.locators.email);
        screenshot.compare(loginPage.locators.password);
    });

    it('should compare snapshot of forgot password page', () => {

        loginPage.clickOnForgotPassword();
        screenshot.compare(loginPage.locators.forgotPasswordContainer);

    });

    it('should compare snapshot of failure login attempt ', () => {

        loginPage
            .enterLoginDetails(testData.getNewUser());
        screenshot.compare(loginPage.getAlert());

    });

    it('should compare snapshot of side menu option', () => {

        loginPage
            .enterLoginDetails(testData.getValidLoginUser())
            .assertLandingPage();
        screenshot.compare("MENU_CONTAINER");
    });
})
