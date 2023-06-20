"use strict";
const {By} = require("selenium-webdriver");
const BasePage = require ('./base.page');

module.exports = class CheckoutPage extends BasePage{

    getCheckoutPageTitle (){
        return this.driver().findElement(By.tagName('h2')).getText();
    }
}