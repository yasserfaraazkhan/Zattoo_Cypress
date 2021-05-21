import BasePage from "./basePage";
class DashboardPage extends BasePage {
    constructor() {
        super();
        this.locators = {
            highlightNavigationOption: "MENU_LINK_HIGHLIGHTS",
            headerTitle: "HEADER_TITLE"
        }
    }

    assertLandingPage(){
        cy.waitForElementToBePresent(`[data-soul=${this.locators.headerTitle}]`);
        cy.findElementAndAssertText(this.locators.headerTitle, 'Highlights');
        cy.getElement(this.locators.highlightNavigationOption).invoke('attr','aria-current').should('eq', 'page')
    }

}

export const dashboardPage = new DashboardPage();
