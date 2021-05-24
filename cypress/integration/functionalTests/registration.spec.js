import { registrationPage } from '../../support/helpers/pages/registrationPage';
import { testData } from '../../support/helpers/TestData/generateData';

describe("On the Zattoo's signup page, User", () => {

    beforeEach(() => {
        registrationPage.navigateToSignUpPage();
    })

    it('should be prompted with error messages when required fields are left empty', () => {
        registrationPage.assertMandatoryFieldsErrorMessages();
    });

    it('should be able to assert third party signup options', () => {
        registrationPage.assertSignByFacebookAvailable()
                        .assertSignByGoogleAvailable();
    });

    it('should be navigated to payments page when user chooses premium package', () => {
        registrationPage.enterNewUserDetails(testData.getNewUser())
                        .changePackage()
                        .selectUltimatePackage()
                        .assertVariousPaymentMethodsAvailable();
    });

    it('should be successfully register a new user with Free package', () => {
        registrationPage.enterNewUserDetails(testData.getNewUser())
                        .confirmSignUp()
                        .assertSuccessfullSubscription()
                        .assertLandingPage();
    });
})
