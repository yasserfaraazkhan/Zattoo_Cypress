import { MESSAGES, BUTTONTEXT } from "../constants";

import BasePage from "./basePage";
import { dashboardPage } from "./dashboardPage";
class RegistrationPage extends BasePage {
    constructor() {
        super();
        this.locators = {
            appNodeElement: '#app-node',
            additionalSignUp: "SIGNUP_FORM_SSO_BLOCK",
            cookieBanner: "#onetrust-accept-btn-handler",
            chooseFreeServiceOption: "SERVICE_LOGO_FREE",
            continueWithFree: "OFFER_CTA_FREE",
            continueWithPremium: "OFFER_CTA_PREMIUM",
            continueWithUltimate: "OFFER_CTA_ULTIMATE",
            confirmFreePackage: "SERVICE_LOGO_FREE",
            dayOfBirth: "SIGNUP_FORM_DAY_INPUT",
            email: "SIGNUP_FORM_EMAIL_LABEL",
            emailFieldError: "SIGNUP_FORM_EMAIL_ERROR",
            monthOfBirth: "SIGNUP_FORM_MONTH_INPUT",
            password: "SIGNUP_FORM_PASSWORD_LABEL",
            passwordFieldError: "SIGNUP_FORM_PASSWORD_ERROR",
            genderDropdown: "SIGNUP_FORM_GENDER_INPUT",
            genderFieldError: "SIGNUP_FORM_GENDER_ERROR",
            dobFieldError: "SIGNUP_FORM_BIRTH_DATE_ERROR",
            signupPageHeadline: "TIMELINE_HEADLINE",
            signupButton: "SIGNUP_BUTTON",
            switchProduct: "SWITCH_PRODUCT_LINK",
            watchForFree: "PRODUCT_CONFIRMATION_CTA",
            settingsOption: "MENU_LINK_SETTINGS",
            logOut: "SETTINGS_CONTROL_LOGOUT",
            paymentBanking: "PAYMENT_METHOD_SOFORTBANKING",
            paymentCard: "PAYMENT_METHOD_CREDITCARD",
            paymentKlarnaDirect: "PAYMENT_METHOD_KLARNA",
            paymentPaypal: "PAYMENT_METHOD_PAYPAL",
            premiumPackage: "SERVICE_LOGO_HIQ",
            ultimatePackage: "SERVICE_LOGO_ZATTOO_ULTIMATE",
            watchNowButton: "PRODUCT_CONFIRMATION_CTA",
            yearOfBirth: "SIGNUP_FORM_YEAR_INPUT"
        }
    }

    /**
     * Navigate to signup page. Implicitly assert Successful Navigation
     */
    navigateToSignUpPage() {
        this.visitPage('/start/signup')
        cy
            .getElement(this.locators.chooseFreeServiceOption)
            .click({ force: true })
            .getElement(this.locators.continueWithFree)
            .click()
            .getElement(this.locators.signupPageHeadline)
            .invoke('text')
            .should('eq', BUTTONTEXT.SIGNUPPAGEHEADER);
        return this;
    }

    /**
     * Assert error messages displayed when required feild is left empty
     */
    assertMandatoryFieldsErrorMessages() {
        cy
            .getElement(this.locators.signupButton)
            .click()
            .findElementAndAssertText(this.locators.emailFieldError, MESSAGES.EMAIL_ERROR_MESSAGE)
            .findElementAndAssertText(this.locators.passwordFieldError, MESSAGES.PASSWORD_ERROR_MESSAGE)
            .findElementAndAssertText(this.locators.genderFieldError, MESSAGES.GENDER_ERROR_MESSAGE)
            .findElementAndAssertText(this.locators.dobFieldError, MESSAGES.DOB_ERROR_MESSAGE);
        return this;
    }

    /**
     * 
     * @param {Object} user Enter required user details for signup 
     * @returns 
     */
    enterNewUserDetails(user) {
        cy
            .getElement(this.locators.email).type(user.email)
            .getElement(this.locators.password).type(user.password)
            .getElement(this.locators.genderDropdown).select(user.gender)
            .getElement(this.locators.dayOfBirth).type(user.day)
            .getElement(this.locators.monthOfBirth).type(user.month)
            .getElement(this.locators.yearOfBirth).type(user.year)
            .getElement(this.locators.signupButton).click();
        return this;
    }

    selectUltimatePackage() {
        cy
            .getElement(this.locators.ultimatePackage).click()
            .getElement(this.locators.continueWithUltimate).click();

        return this;
    }

    selectPremiumPackage() {
        cy
            .getElement(this.locators.premiumPackage).click()
            .getElement(this.locators.continueWithPremium).click();
        return this;
    }

    changePackage() {
        cy
            .getElement(this.locators.switchProduct)
            .click();
        return this;
    }

    confirmSignUp() {
        cy
            .isDisplayed(this.locators.confirmFreePackage)
            .url()
            .should('contain', 'confirm_product')
            .getElement(this.locators.watchNowButton)
            .click();
        return this;
    }

    /**
     * verify user is Successfully Signed up
     */
    assertSuccessfullSubscription() {
        cy
            .contains('Stream now').as('streamNow')
            .invoke('attr', 'href')
            .should('contain', 'highlights')
            .url()
            .should('contain', 'thank_you')
            .get('@streamNow')
            .click()
        return dashboardPage;
    }

    assertSignByFacebookAvailable() {
        cy
            .getElement(this.locators.additionalSignUp)
            .find('button')
            .eq(0)
            .invoke('text')
            .should('eq', BUTTONTEXT.FACEBOOKSIGNUP);
        return this;
    }

    assertSignByGoogleAvailable() {
        cy
            .getElement(this.locators.additionalSignUp)
            .find('button')
            .eq(1)
            .invoke('text')
            .should('eq', BUTTONTEXT.GOOGLESIGNUP);
        return this;
    }

    assertVariousPaymentMethodsAvailable() {
        cy
            .isDisplayed(this.locators.paymentBanking)
            .isDisplayed(this.locators.paymentCard)
            .isDisplayed(this.locators.paymentPaypal)
            .isDisplayed(this.locators.paymentKlarnaDirect);
        return this;
    }

    assertZattooUnAvailableMessageDisplayed() {
        cy
            .visit('/start/signup')
            .get(this.locators.appNodeElement)
            .find('p').eq(2)
            .invoke('text')
            .should('eq', MESSAGES.ZATTOOUNAVAILABLE);
        return this;
    }
}

export const registrationPage = new RegistrationPage();
