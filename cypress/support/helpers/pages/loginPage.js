import { MESSAGES } from "../constants";

import BasePage from "./basePage";
import { dashboardPage } from "./dashboardPage";
class LoginPage extends BasePage {
    constructor() {
        super();
        this.locators = {
            email: "AUTHENTICATION_INPUT_USERNAME",
            forgotPasswordContainer: "false",
            forgotPasswordLink: "AUTHENTICATION_LINK_FORGOT_PASSWORD",
            forgotPasswordPageHeader: "AUTHENTICATION_PAGE_HEADING",
            forgotPasswordSuccessPageHeader: "AUTHENTICATION_SUCCESS_PAGE",
            password: "PASSWORD_FIELD_INPUT",
            submit: "AUTHENTICATION_SUBMIT",
        }
    }

    getAlert(){
        return BasePage.locators.dangerIcon;
    }

    assertErrorDisplayed() {
        this.asserAlertDisplayed(MESSAGES.LOGIN_ERROR_MESSAGE);
        return this;
    }

    clickOnForgotPassword() {
        cy
            .getElement(this.locators.forgotPasswordLink)
            .click()
            .url()
            .should('contain', 'recovery')
            .findElementAndAssertText(this.locators.forgotPasswordPageHeader, 'Reset Password')
        return this
    }

    enterEmail(email){
        return cy.getElement(this.locators.email).clear().type(email)
    }

    enterLoginDetails(user) {

        this.enterEmail(user.email)
            .getElement(this.locators.password)
            .type(user.password)
            .getElement(this.locators.submit)
            .click();
        return dashboardPage;
    }

    navigateToLoginPage() {
        this.visitPage('/login');
    }

    requestPasswordRecoveryFor(recoveryEmail){
        this.enterEmail(recoveryEmail.email)
            .getElement(this.locators.submit)
            .click()
            .getElement(this.locators.forgotPasswordPageHeader)
            .contains('Email sent!')
        return this;
    }
}

export const loginPage = new LoginPage();
