"use strict";
const {By} = require("selenium-webdriver");
const BasePage = require ('./base.page');

module.exports = class LoginPage extends BasePage {

    goToLoginPage(){
        this.driver().get('http://shop.qa.rs/login');
    }


    getLoginButton(){
       return this.driver().findElement(By.name('login'));
    }
    getInputKorisnickoIme(){
        return this.driver().findElement(By.name('username'));
    };

    getInputLozinka (){
        return this.driver().findElement(By.name('password'));
    }







}