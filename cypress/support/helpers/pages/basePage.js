class BasePage {
    static get locators() {
        return {
            cookieBanner: "#onetrust-accept-btn-handler",
            dangerIcon: "DANGER_ICON",
            alertPopup: "NOTIFICATION_TEXT"
        }
    }

    /**
     * 
     * @param {String} url to navigate
     */
    visitPage(url) {
        cy
            .visit(url)
            .get(BasePage.locators.cookieBanner)
            .click();
        return this;
    }

    /**
     * 
     * @param {string} message alert text to verify
     */
    asserAlertDisplayed(message) {
        cy
            .isDisplayed(BasePage.locators.dangerIcon)
            .findElementAndAssertText(BasePage.locators.alertPopup, message);
        return this;
    }

}

export default BasePage;
