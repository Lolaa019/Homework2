"use strict";
require ("chromedriver");
const webdriver = require ('selenium-webdriver');
const {By, Key, until} = require ('selenium-webdriver');
const {assert, expect} = require ('chai');
const {elementLocated} = require("selenium-webdriver/lib/until");
const HomePage = require ('../pages/home.page');
const RegisterPage = require ('../pages/register.page');
const LoginPage = require ('../pages/login.page');
const CartPage = require ('../pages/cart.page');
const CheckoutPage = require ('../pages/checkout.page');
const testData = require('../data/shop.json');

describe.only ( 'Shop QA.rs tests', function (){
    let driver;
    let pageHomepage;
    let pageRegister;
    let pageLogin;
    let pageCart;
    let pageCheckout;

    let packages;


    before (function (){
        driver = new webdriver.Builder().forBrowser('chrome').build();
        pageHomepage = new HomePage(driver);
        pageRegister = new RegisterPage(driver);
        pageLogin = new LoginPage(driver);
        pageCart = new CartPage(driver);
        pageCheckout = new CheckoutPage(driver);

        packages = testData.order;








    });

    after (async function (){
        //await driver.quit();
    });

    beforeEach(function (){
        //--> pokrece se pre svakog testa
    });

    afterEach(function (){
        //--> pokrece se nakon svakog testa
    });

    it ('Verifies if Homepage is open', async function (){

        await pageHomepage.goToPage();
        const pageTitle = await pageHomepage.getPageHeaderTitle();
        expect(pageTitle).to.contain('(QA) Shop');
        expect (await pageHomepage.isBugListDivDisplayed()).to.be.true;
    });

    it ('Goes to registration page', async function (){

        await pageHomepage.clickOnRegisterLink();
        expect (await pageRegister.getRegisterButtonValue() ).to.contain('Register');
        expect (await pageRegister.getCurrentUrl()).to.be.eq('http://shop.qa.rs/register');
    });

    it ('Successfully performs registration', async function (){

        await pageRegister.getInputFirstName().sendKeys('miki');
        await pageRegister.getInputLastName().sendKeys('mikic');
        await pageRegister.getInputEmail().sendKeys('a@example.local');

        const randomNumber = pageRegister.random(10000, 100000000);
        await pageRegister.getInputUsername().sendKeys(`miki.mikic.${randomNumber}`);
        await pageRegister.getInputPassword().sendKeys('a');
        await pageRegister.getInputConfirmPassword().sendKeys('a');
        await pageRegister.getRegisterButton().click();
        expect (await pageHomepage.getSuccessAlertText()).to.contain('Uspeh!');
    });

    it ('Goes to Login page and successfully performs login', async function(){

        await pageHomepage.clickOnLoginLink();
        expect (await pageRegister.getCurrentUrl()).to.be.eq('http://shop.qa.rs/login');
        await pageLogin.getInputKorisnickoIme().sendKeys('peki.pekic');
        await pageLogin.getInputLozinka().sendKeys('123');
        await pageLogin.getLoginButton().click();
        expect (await pageHomepage.getWelcomeBackTitle()).to.contain('Welcome back');
        assert.isTrue(await pageHomepage.isLogoutLinkDisplayed()); //u sustini moze i expext, nego vezbamo

    });

    it('Empties the shopping cart', async function (){
        await pageCart.actionEmptyCart();
    });


    it ('Adds item(s) to cart', async function (){
        for (const index in packages) {
            const item = packages[index];





        /* Posto svi paketi (starter, small, pro, enterprise) na stranici
        imaju isti naziv, moramo da ih lociramo preko xpatha putem /ancestor. Putanje za sve pakete su iste, samo se razlikuje deo koji nosi naziv
        paketa. Da ne bismo 4 puta(za svaki paket) pravili posebno sve, ono sto se nalazi u const packageToAdd (koju smo napravili u
        describe) se prosledjuje na to mesto u xpath i locira bas onaj paket koji nama treba. Znaci, ako nam treba starter paket, onda u const packageToAdd
        pisemo 'starter'. Na taj nacin ne moramo na sto mesta da pisemo "starter".

        dodatno objasnjenje: u const packageDiv ide f-ja getPackageDiv. F-ja getPackageDiv(packageToAdd) sadrzi xpath putanju sa selektovanim div-om i ostavljenim mestom
        za naziv paketa, tj title. Naziv paketa koji zelimo se nalazi u const packageToAdd koja je deklarisana u describe bloku.*/
        const packageDiv = await pageHomepage.getPackageDiv(item.package);
        const quantity = pageHomepage.getQuantityDropdown(packageDiv); //vraca dropdown koji pripada odredjenom paketu
        const options = await pageHomepage.getQuantityOptions(quantity); //izlistaj mi sve opcije iz ropdown menija u okviru starter paketa i smesti ih u option

        await Promise.all(options.map(async function (option){
            const text = await option.getText();

            if (text === item.quantity.toString()) {
                await option.click();
                const selectedValue = await quantity.getAttribute('value');
                expect ( selectedValue).to.contain(item.quantity.toString());

                await pageHomepage.getOrderButton(packageDiv).click();
                expect (await driver.getCurrentUrl()).to.contain('http://shop.qa.rs/order');
            }



        }));
            pageHomepage.goToPage();
        }

    });

    it ('Opens Shopping cart',async function (){
        await pageHomepage.clickOnViewShoppingCartLink();
        expect (await pageCart.getCurrentUrl()).to.contain('http://shop.qa.rs/cart');
        expect (await pageCart.getPageHeaderTitle()).to.contain('Order')

    });

    it ('Verifies items are in cart ', async function(){
        for (const index in packages) {
            const item = packages[index];

            const orderRow = await pageCart.getOrderRow(item.package.toUpperCase());
            const itemQuantity = await pageCart.getItemQuantity(orderRow);
            expect(await itemQuantity.getText()).to.eq(item.quantity.toString());
        }



    });


    it ('Verifies if total item  price is correct', async function (){
        for (const index in packages) {
            const item = packages[index];
            const orderRow = await pageCart.getOrderRow(item.package.toUpperCase());
            const itemQuantity = await pageCart.getItemQuantity(orderRow);
            const itemPrice = await pageCart.getItemPrice(orderRow);
            const itemPriceTotal = await pageCart.getItemPriceTotal(orderRow);

            const quantity = Number(await itemQuantity.getText()); //2

            const price = Number((await itemPrice.getText()).substring(1));    //300  //substring-preskoci prvi karakter i vrati nam od drugog
            const priceTotal = Number((await itemPriceTotal.getText()).substring(1));   // 600

            const price2 = Number((await itemPrice.getText()).replace('$', ''));  //replace- zameni mi znak $ praznim stringom
            const priceTotal2 = Number((await itemPriceTotal.getText()).replace('$', ''));

            const price3 = Number((await itemPrice.getText()).replace(/\D/g, '')); // pise se izmedju znakova //, \D vraca sve non-digit karaktere. g je da je na global nivou
            const priceTotal3 = Number((await itemPriceTotal.getText()).replace(/\D/g, ''));

            const calculatedItemPriceTotal = quantity * price; // 2 * 300 = 600
            const calculatedItemPriceTotal2 = quantity * price2;
            const calculatedItemPriceTotal3 = quantity * price3;

            expect(calculatedItemPriceTotal).to.eq(priceTotal); // 600 = 600
            expect(calculatedItemPriceTotal2).to.eq(priceTotal2);
            expect(calculatedItemPriceTotal3).to.eq(priceTotal3);
        };

    });

    it ('Performs checkout', async  function (){
        await pageCart.getCheckoutButton();
        await pageCart.clickOnCheckoutButton();
        expect (await pageCheckout.getCheckoutPageTitle()).to.contain('You have successfully placed your order')

    })


   /* it('Performs logout', async function(){

        await pageHomepage.getLogoutLink().click();
        assert.isTrue(await pageHomepage.isLoginLinkDisplayed());

    }); */










});