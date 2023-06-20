"use strict";
const {By} = require("selenium-webdriver");
const BasePage = require ('./base.page');

module.exports = class CartPage extends BasePage {

        actionEmptyCart (){
            this.driver().get('http://shop.qa.rs/cart/empty');
        };

        getOrderRow(packageName){
            const xpathOrderRow = `//td[contains(., "${packageName}")]/parent::tr`;
            return this.driver().findElement(By.xpath(xpathOrderRow));
        };

        getItemQuantity (orderRow){
            return orderRow.findElement(By.xpath(`td[2]`));
        };

        getItemPrice (orderRow){
            return orderRow.findElement(By.xpath(`td[3]`));
        };

        getItemPriceTotal (orderRow){
            return orderRow.findElement(By.xpath(`td[4]`));
        };

        getCheckoutButton (){
            return this.driver().findElement(By.name('checkout'));

        };

        async clickOnCheckoutButton(){
            await (await this.getCheckoutButton()).click();


        }















}