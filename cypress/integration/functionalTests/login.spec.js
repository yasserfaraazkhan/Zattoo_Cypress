import { loginPage } from '../../support/helpers/pages/loginPage';
import { testData } from '../../support/helpers/TestData/generateData';

describe("On the Login page, User", () => {

    beforeEach(() => {
        loginPage.navigateToLoginPage()
    })

    it('should be prompted with error messages when invalid email is entered', () => {

        loginPage.enterLoginDetails(testData.getSpecialCharDeatils());
        loginPage.assertErrorDisplayed();
    });

    it('should be able to request to reset password', () => {

        loginPage
            .clickOnForgotPassword()
            .requestPasswordRecoveryFor(testData.getNewUser());
    });

    it('should not be able to login unregistered user', () => {

        loginPage
            .enterLoginDetails(testData.getNewUser())
    });

    it('should be able to successfully login into the applicatio', () => {

        loginPage
            .enterLoginDetails(testData.getValidLoginUser())
            .assertLandingPage();
    });
})
