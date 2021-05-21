const faker = require("faker");

class TestData {

    getValidLoginUser() {
        return {
            email: Cypress.env('testUserEmail'),
            password: Cypress.env('testUserPassword')
        }
    }

    getSpecialCharDeatils() {
        return {
            email: "!@)(*&",
            password: "QWERTY!@#"
        }
    }

    getNewUser() {
        let genders = [ 'Female' , 'Male' ];
        return {
            email: faker.internet.email(),
            password: faker.internet.password(),
            gender: faker.random.arrayElement(genders),
            day: faker.random.number({ min: 1, max: 30 }),
            month: faker.random.number({ min: 1, max: 12 }),
            year: faker.random.number({ min: 1990, max: 2005 })
        }
    }
}
export const testData = new TestData();
