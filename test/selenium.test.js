
"use strict";
require ("chromedriver");
const webdriver = require ('selenium-webdriver');
const {By, Key, until} = require ('selenium-webdriver');
const {assert, expect} = require ('chai');
const {elementLocated} = require("selenium-webdriver/lib/until");


/* Drugi nacin kako da ubacimo assert i expect iz chai biblioteke, red iznad je bio prvi:
*  const assert = chai.assert;
*  const expect = chai.expect */

describe ("Selenium tests", function (){
    let driver;

    before (function (){       /* izvrsava se JEDNOM pre  svih testova. Ubacujemo neku osnovnu kofiguraciju
                                        za uspesno izvsavanje nasih testova*/

        driver = new webdriver.Builder().forBrowser('chrome').build();

    });

    after (async function(){   //izvrsava se JEDNOM nakon svih testova. Fakticki cistimo za sobom
        await driver.quit();       // ---> ovo zatvara browser na kraju svakog testa, zato sam ga zakomentarisala
    // ako nam je potrebno da se nesto izvrsava pre pocetka svakog testa, onda pisemo beforeEach(function() {...});
    });

    it ('Opens qa.rs website', async function(){  // otvara web stranicu
        await driver.get ('https://qa.rs');
        const pageTitle = await driver.getTitle();      //uzima naslov stranice
        expect (pageTitle).to.contain('QA.rs');      // da li naslov preuzete stranice sadrzi u sebi "QA.rs"
        assert.equal(pageTitle, 'Edukacija za QA testere - QA.rs'); // drugi nacin validacije - uporedjuje da li je
                                                                             // naslov preuzete stranice bas Edukacija za QA testere - QA.rs

    });

    it ('opens Google.com', async function(){
        await driver.get('https://www.google.com/');
        const pageTitle = await driver.getTitle();
        expect(pageTitle).to.contain('Google');
    });


    it ('performs search on Google', async function() {
        expect(await driver.getTitle()).to.contain('Google');
        const inputSearch = await driver.findElement(By.name('q'));
        inputSearch.click();
        inputSearch.sendKeys("qa.rs", Key.ENTER);


        /*hocemo da verifikujemo da li smo zaista na search stranici. Zbog toga trazimo nesto u inspect element
        sto bi nam na to ukazalo. Nasli smo  element div sa atributom id (search) sto nam govori da vrednost tog atributa
        nije automatski generisan, vec ga je neko planski tu stavio.

        E sad, posto vreme odziva moze da varira (moze biti 1 sek, ali moze i 10), da nam testovi ne bi pucali zbog toga,
        selenium ima opciju Wait u kojoj kazemo seleniumu da saceka da se nesto desi, pa onda nastavljamo dalje.
         */


      await driver.wait(until.elementLocated(By.id('search')));
      expect (await driver.getTitle()).to.contain('qa.rs');

    });

    it ('goes to next page of Google search results', async function(){
        expect (await driver.getTitle()).to.contain('qa.rs'); //validacija da li smo na dobroj stranici
        const navigation = await driver.findElement(By.xpath("(//div[@role=\"navigation\"])[3]")); //nadji ceo navigacioni element
        const linkNextPage = navigation.findElement(By.id("pnnext")); //trazi next dugme samo u okviru elementa navigacije
        linkNextPage.click();

        async function konvertuj() {
            return await driver.getText('background-position:-53px 0');
        }


        expect (await driver.findElement(By.xpath('(//div[@role="navigation"])[3]'))).to.contain(konvertuj());

        //svakako se u navigacionom baru u dnu google strane nalazi O slovo koje je crveno, tako da nam ova provera ne znaci
        //apsolutno nista... ALI DOBRO BITNA JE VOLJA.....
        /* hocemo da utvrdimo da li smo zaista otisli na narednu stranicu. U insoect element lociramo element za navigaciju
        U sklopu njega vidimo da je u nazivu Google crvenom bojom slovo O oznacena stranica koja je trenutno prikazana.
        Ostala slova su zute boje. Lociran je crveni element preko xPath-a i vidimo da je od drugacije stilizovan.
        Taj element  u nazivu ima slova i brojeve, sto predstavlja dva razlicita tipa podatka. Zato pravimo asinhronu funkciju
         koja ce to pretvoriti u text.
         */


        /* nekad bas i ne postoji nacin da se verifikuje ono sto bismo mi zeleli. Konkretno u ovom slucaju
  * bas i nemamo neki izbor  da verifikujemo da li smo presli na narednu stranicu. ALi, ono sto mozemo
  * da utvrdimo jeste da li se i dalje nalazimo na stranici na kojoj trazimo qa.rs. Provericemo
  * da li je i dalje tu onaj div sa id-em "search" */

        await driver.wait(until.elementLocated(By.id("search"))); //verifikujemo da smo i dalje na stranici sa rezultatima
        expect (await driver.getTitle()).to.contain("qa.rs");



    });




});

