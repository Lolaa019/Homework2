"use strict";
const {By} = require("selenium-webdriver");
const BasePage = require ('./base.page');

module.exports = class RegisterPage extends BasePage {

    getRegisterButton (){
        return this.driver().findElement(By.name('register'));
    };

    getRegisterButtonValue () {
        return this.getRegisterButton().getAttribute('value')  //vraca vrednost atributa iz zagrade
    };


    getInputFirstName (){
        return this.driver().findElement(By.name('ime'));
    };

    getInputLastName (){
        return this.driver().findElement(By.name('prezime'));
    };

    getInputEmail (){
        return this.driver().findElement(By.name('email'));
    };

    getInputUsername (){
        return this.driver().findElement(By.name('korisnicko'));
    };

    getInputPassword (){
        return this.driver().findElement(By.name('lozinka'));
    };

    getInputConfirmPassword (){
        return this.driver().findElement(By.name('lozinkaOpet'));
    }








}