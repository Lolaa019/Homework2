"use strict";
const {By} = require("selenium-webdriver");
module.exports = class BasePage {
    #driver;
    constructor (webdriver) {
        this.#driver = webdriver;
    };
    driver(){
        return this.#driver;
    };

    async clickOnViewShoppingCartLink (){
        const linkShoppingCart = await this.driver().findElement(By.linkText('View shopping cart'));
        await linkShoppingCart.click();
    };

    getCurrentUrl (){
        return this.driver().getCurrentUrl();
    };

    getPageHeaderTitle() {
        return this.driver().findElement(By.tagName('h1')).getText();
    };

    random (min, max){
        return Math.floor(Math.random() * (max - min)) + min;

    }





}