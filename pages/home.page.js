"use strict";

const {By} = require("selenium-webdriver");
const BasePage = require ('./base.page');

module.exports = class HomePage extends BasePage{

    goToPage() {
        this.driver().get('http://shop.qa.rs/');
    };



    isBugListDivDisplayed () {

        return this.driver().findElement
        (By.xpath('//div[@class="row" and contains(., "ORDER YOUR BUGS TODAY")]')).isDisplayed()
    };

    async clickOnRegisterLink(){
        const registerLink = this.driver().findElement(By.linkText("Register"));
        await registerLink.click();

    };

    getSuccessAlertText(){
        return this.driver().findElement(By.className('alert alert-success')).getText();
    };

    async clickOnLoginLink(){
        const loginLink = this.driver().findElement(By.linkText('Login'));
        await loginLink.click();
    };

    getWelcomeBackTitle (){
        return this.driver().findElement(By.tagName('h2')).getText();
    };

    getLogoutLink (){
        return this.driver().findElement(By.partialLinkText('Logout'));
    };

    getLoginLink (){
        return this.driver().findElement((By.linkText('Login')))
    }

    isLogoutLinkDisplayed (){
        return this.getLogoutLink().isDisplayed();
    };

    isLoginLinkDisplayed (){
        return this.getLoginLink().isDisplayed();
    };

    getPackageDiv (title) {
        const xpathPackage = `//h3[contains (text(), "${title}")]/ancestor::div[contains (@class, "panel")]`;
        return this.driver().findElement(By.xpath(xpathPackage)); //ubacujemo putanju iz const xpathPackage
    };

    getQuantityDropdown (packageDiv){
        return packageDiv.findElement(By.name('quantity'));  /*unutar onog div elementa (onaj koji selektuje ceo starter paket)
                                                                         nadji onaj sa imenom "quantity"*/


    };

    getQuantityOptions (quantityDropdown){     //vraca nam niz elemenata iz dropdown menija
        return quantityDropdown.findElements(By.tagName('option'));


    };

    getOrderButton (packageDiv){
        return packageDiv.findElement(By.className('btn btn-primary'));

    }



}