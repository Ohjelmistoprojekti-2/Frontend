# React Native -sovelluksen järjestelmätestauksen toteuttaminen Cypressillä
>_Ohjelmistokehityksen teknologioita -kurssin seminaarityö, Seminaari 1 &ndash; Testaus_\
> **Tekijä:** Jasmin Lumme [@jazmc](https://github.com/jazmc)

## Sisältö
 1. [Johdanto](#1-johdanto)
 2. [Käytetyt tekniikat](#2-käytetyt-tekniikat)
 3. [Työn vaiheet](#3-työn-vaiheet)
    - [3.1 Cypressin asennus](#31-cypressin-asennus)
    - [3.2 Testien luominen](#32-testien-luominen)
    - [3.3 GitHub Actions -workflown luominen](#33-github-actions--workflown-luominen)
      - [3.3.1 Ympäristömuuttujat](#331-ympäristömuuttujat)
      - [3.3.2 Testien muokkaaminen GitHub Actionsia varten](#332-testien-muokkaaminen-github-actionsia-varten)
 4. [Pohdinta](#4-pohdinta)

## 1. Johdanto
Ohjelmistoprojekti II -kurssilla olimme toteuttaneet ryhmätyönä [React Native -sovelluksen](https://github.com/Ohjelmistoprojekti-2) (työnimi DuuniApp), joka oli saatu sen verran pitkälle, että sovelluksen testaaminen tuli ajankohtaiseksi. Sen vuoksi testaamisen valitseminen seminaariaiheeksi tuntui luontevalta.

Testattavan sovelluksen rakenne testaushetkellä oli kutakuinkin tällainen _(harmaat kohdat eivät olleet vielä toiminnassa)_:

![Järjestelmäkaavio](https://i.imgur.com/gH8cC86.png)

Koska olin jo aiemmilla kursseilla jonkin verran perehtynyt yksikkötestaukseen, päätin tarkentaa seminaarityön aiheeni nimenomaan **järjestelmätestaukseen**. Päätöstä puolsi myös se, että eräs toinen ryhmän jäsenistä suunnitteli tekevänsä seminaarityönsä saman sovelluksen yksikkötestaamisesta, joten en halunnut aiheiden menevän hänen kanssaan ristiin.

Seminaarityötä käsittelevällä oppitunnilla joku mainitsi [Cypress-kirjaston](https://cypress.io/), joka pikaisella googlauksella kuulosti juuri sellaiselta, josta halusin oppia lisää. Järjestelmätestaus ylipäätään oli minulle aiheena vieras, joten seminaarityön tavoitteeksi otin perehtyä siihen aiheena, ja toteuttaa joitain yksinkertaisia end-to-end-testejä DuuniAppiin siinä määrin kuin se olisi sovelluksen sen hetkisen valmiuden perusteella mahdollista.

## 2. Käytetyt tekniikat
[Cypress](https://cypress.io/) on uuden sukupolven front-endin testaustyökalu, joka on kehitetty moderneja web-sovelluksia ajatellen. Cypress on teknologiana monipuolinen, ja soveltuu erinomaisesti niin yksikkötestaukseen, integraatiotestaukseen kuin myös järjestelmätestaukseen.

Googletellessani Cypressistä nimenomaan React Native -sovellusten testaamisessa törmäsin blogipostaukseen nimeltä [The Complete Guide to Testing React Native App Using Cypress](https://glebbahmutov.com/blog/testing-react-native-app-using-cypress/). Blogipostauksen on kirjoittanut **Gleb Bahmutov**, joka on aikaisemmin työskennellyt Cypressin tiimissä (_VP of Engineering_) ja julkaissut useita Cypressiin pohjautuvia npm-paketteja ja tehnyt aiheeseen liittyviä tutoriaaleja. 

## 3. Työn vaiheet
**Seminaarityöni pohjautuu suurelta osin [tähän Gleb Bahmutovin tutoriaaliin](https://glebbahmutov.com/blog/testing-react-native-app-using-cypress/).** Mikäli vaihe sisältää tutoriaalista poimittua koodia, mainitsen siitä kyseisessä kohdassa aina erikseen.

Seminaarityötä varten loin Frontend-repositoryyn uuden [test-haaran](https://github.com/Ohjelmistoprojekti-2/Frontend/tree/test).

### 3.1 Cypressin asennus
Lähdin seuraamaan tutoriaalia kohdasta ["The first Cypress test"](https://glebbahmutov.com/blog/testing-react-native-app-using-cypress/#the-first-cypress-test), sillä testattava sovellus oli jo valmiina eikä sitä tarvinnut tästä syystä alustaa. Ensiksi Cypress täytyi asentaa npm:n avulla projektin devDependenceihin ajamalla alla oleva komento projektikansiossa.
```pwsh
$ npm install --save-dev cypress
```
Asennuksen jälkeen ajoin projektikansiossa npx:llä Cypressin käynnistämiskomennon, mikä alusti projektiin Cypressin käyttämät tiedostot ja kansiorakenteen.
```pwsh
$ npx cypress open
```
Juuri luotuun `cypress.json`-tiedostoon laitoin tutoriaalin ohjeiden mukaisesti localhostin portin 19006, jonne expo käynnistää sovelluksen web-version. Lisäksi määrittelin viewportille korkeuden ja leveyden vastaamaan iPhone X:n mittoja, koska sovellus on suunniteltu käytettäväksi ensisijaisesti mobiililaitteella.
```js
{
    "fixturesFolder": false, // tutoriaalista
    "supportFile": false, // tutoriaalista
    "pluginsFile": false, // tutoriaalista
    "baseUrl": "http://localhost:19006", // tutoriaalista
    "viewportWidth": 375,
    "viewportHeight": 812
}
```

### 3.2 Testien luominen
Aloitin testien luomisen yksinkertaisesti tutoriaalin mallia seuraten. Halusin testata ainakin seuraavia asioita:
- Avautuuko sovellus
- Toimiiko latauskomponentti backendin vastausta odotellessa
- Hakeeko sovellus onnistuneesti työpaikkoja backendistä
- Onnistuuko navigointi sovelluksen kahden tabin välillä
- Toimivatko firman nimien checkboxit
- Toimivatko kaikki kirjoituskentät
- Toimiiko hakusanojen poisto-ominaisuus

Kaikki kirjoittamani testit selventävine kommentteineen löytyvät [spec.js](cypress/integration/spec.js)-tiedostosta.

Jotta testit pystyivät tunnistamaan sovelluksen komponentteja, lisäsin komponenteille `testID`-propsin, johon testeissä päästiin käsiksi vastaavan nimisen data-attribuutin kautta esimerkiksi näin:
```js
// komponentissa testID="loading"
cy.get("[data-testid=loading]")
```

### 3.3 GitHub Actions -workflown luominen
End-to-end-testaamiseen kuuluu usein hyvinkin olennaisesti testien automatisointi. Koska sovelluksella oli jo olemassaoleva repository GitHubissa, GitHub Actionsiin workflown luominen [tutoriaalin ohjein](https://glebbahmutov.com/blog/testing-react-native-app-using-cypress/#continuous-integration) onnistui kohtuullisen helposti luomalla `ci.yml`-tiedosto jossa workflow määriteltiin. Lisäksi minun täytyi muuttaa `package.json`-tiedostoa sen verran, että lisäsin `expo`n devDependencieseihin. 

#### **3.3.1 Ympäristömuuttujat**

Heti ensimmäisessä ajossa törmäsin kuitenkin ongelmaan: toinen siihen mennessä rakentamistani testeistä ei mennyt läpi (ks. screenshot). Ymmärsin, että ongelmana oli se, ettei sovellus saanut backendistä dataa, jonka kokoa testi yritti varmistella. Tämä johtui siitä, että sovelluksella oli käytössään **ympäristömuuttujia**, jotka tietenkään eivät olleet GitHub Actionsin saatavilla, koska `.env`-tiedosto oli tietoturvasyistä luonnollisestikin `.gitignore`ssa.

![Screenshot epäonnistuneesta testilokista](https://i.imgur.com/VyVfatp.png)

Sain selviteltyä GitHubin [dokumentaatiosta](https://docs.github.com/en/actions/learn-github-actions/environment-variables), että Actionsiinkin on mahdollista tarjota ympäristömuuttujia laittamalla ne repositoryn _Secrets_-osioon repon asetuksista. Secretsien luominen oli todella helppoa GitHubin yksinkertaisen avain-arvo-käyttöliittymän avulla. Tämän tehtyäni jouduin muuttamaan Actionsin [määrittelytiedostoa](.github/workflows/ci.yml) (`ci.yml`) hiukan tutoriaalista poikkeavaksi lisäten sinne `env`-määritykset:

```yml
name: End-to-end tests
on: [push, pull_request]
# Ympäristömuuttujien tarjoaminen GitHub Actionsille:
env:
  REACT_APP_BACKEND_API_KEY: ${{ secrets.REACT_APP_BACKEND_API_KEY }}
  REACT_APP_BACKEND_URL: ${{ secrets.REACT_APP_BACKEND_URL }}
jobs:
  # ...
  # (loput kuten tutoriaalissa)
  # ...
```

#### **3.3.2 Testien muokkaaminen GitHub Actionsia varten**
Kun olin saanut ympäristömuuttujat kuntoon, ihmetyksekseni testit failasivat silti. Syynä oli tällä kertaa se, ettei backendin palauttamien työpaikkojen määrä vastannut sitä, mitä sovellus näytti listauksessa. Ajoin testin muutamaan otteeseen, ja sovelluksen näyttämä määrä _(screenshotissa 90)_ vaihteli hieman ajojen välillä. Tästä päättelin, että vika on oltava siinä, ettei sovellus ehdi ladata kaikkia työpaikkoja näkymään ennen kuin testi ajetaan.

![Screenshot virhelokista](https://i.imgur.com/P9WJ4z5.png)

Ratkaisin ongelman lisäämällä [testiin](cypress/integration/spec.js) hiukan delayta juuri ennen kuin arrayiden suuruutta vertaillaan. Cypressin kätevä `wait`-komento hoiti homman hienosti.

```js
it("loads jobs from backend api", () => {
// ... (testin alkuosa) ...
.then((jobs) => {
      cy.log("**navigating to job listing page**");
      cy.contains("Job results").click();
      cy.wait(5000); // odotetaan 5 sek koska github actions workflow on niin hidas että failaa muuten
      cy.get("[data-testid=job]").should("have.length", jobs.length);
    });
});
```

### 3.3 Kattavuusraportti
Samaisessa tutoriaalissa käsiteltiin myös _code coveragea_, eli testien kattavuutta, ja miten se saadaan selville Cypressillä tehtävässä e2e-testauksessa. Lueskelin myös Cypressin [dokumentaatiota aiheesta](https://docs.cypress.io/guides/tooling/code-coverage#Using-code-transpilation-pipeline). 

Lähestymistapana käytin `babel-plugin-istanbul`ia, jonka asensin devDependenceihin. Lisäksi minun täytyi asentaa `@cypress/code-coverage`-plugin.
```pwsh
$ npm install --save-dev babel-plugin-istanbul
$ npm install --save-dev @cypress/code-coverage
```
Code coverage-pluginia varten minun täytyi käydä muuttamassa [support/index.js](cypress/support/index.js) sekä [plugins/index.js](cypress/plugins/index.js)-tiedostot niin, että `@cypress/code-coverage` oli niissä huomioituna.

Lisäksi `istanbul` piti lisätä [babel.config.js](babel.config.js)-tiedoston plugins-arrayhyn.
```js
module.exports = function (api) {
  api.cache(true);
  return {
    presets: ["babel-preset-expo"],
    plugins: ["inline-dotenv", "istanbul"],
  };
};
```
Huomasin myös (yhden epäonnistuneen testiajon jälkeen), että `@cypress/code-coverage` vaatii toimiakseen sen, että [cypress.json](cypress.json)-tiedostosta otetaan support- ja plugins-kohdista false pois, eli niiden käyttö sallitaan. Niinpä tiedoston rakenne muuttui tällaiseksi:
```js
{
    "fixturesFolder": false,
    "baseUrl": "http://localhost:19006",
    "viewportWidth": 375,
    "viewportHeight": 812
}
```
Edellä mainittujen steppien jälkeen projektikansioon tuli `coverage`-kansio, joka sisälsi raportin testien kattavuudesta. Testien kattavuus ei ollut kovin korkealla tasolla, sillä Cypress näytti punaista myös yksikkötestien puutteesta (joita minun ei tätä seminaarityötä varten ollut tarkoitus tehdä).

Lisäsin coverage-pluginin tuottamat raportit ja lokit `.gitignore`en.

```gitignore
# cypress test logs etc.
coverage/
.nyc_output/
```

![Screenshot kattavuusraportista](https://i.imgur.com/V23FOIH.png)

## 4. Tulokset ja pohdinta
Työskentelyn päätteeksi [spec.js](cypress/integration/spec.js)-tiedostossa on yhdeksän testiä, jotka mittaavat järjestelmän toimintaa jäljitellen käyttäjän vaikutusta käyttöliittymän kanssa.

**Testit ja niiden nimet:**
- opens application successfully
- loads jobs from backend api
- shows loading indicator
- checks and unchecks a checkbox
- submits a tag with enter
- submits a tag with plus button press
- submits a location and filters jobs accordingly
- deletes a tag
- shows no jobs if there are no matches for keyword

Testien kattavuusraportti näytti testien valmistuttua `92.15 %`, mikä on mielestäni kohtuullisen hyvä kattavuustaso.

![Screenshot kattavuusraportista](https://i.imgur.com/nUFnRE5.png)

Reflektoidakseni seminaarityötä täytyy alkuun todeta, että olin todella tyytyväinen aihevalintaan. Cypressistä löytyi hyvin materiaalia ja sen dokumentaatio oli selkeää, mikä auttoi itse testien luomisessa. Alkuun esim. React-komponenttien manipuloiminen tuntui vaikealta, kun checkbox-komponentti ei olekaan checkbox-input DOM:ssa, ja niin edelleen, joten esimerkiksi checked täytyi kiertää puhtaasti klikkaamalla tätä checkboxilta näyttävää diviä, näin yhden esimerkin mainitakseni.

Työtä auttoi myös se, että Cypressin syntaksi oli mielestäni helppolukuista, ja aiemman jest-kokemuksen ansiosta se näytti jokseenkin tutulta. Cypressin komennot olivat mielestäni myös mukavan itsensä selittäviä (mm. `.contains()`, `.wait()`, `.visit()`, `.log()`, ...), joten oli helppoa päätellä mitä mikäkin komento tekee jo pelkästään niiden nimien perusteella.

Kokonaisuudessaan opin Cypressistä ja e2e-tyyppisestä järjestelmätestaamisesta mielestäni ihan mukavasti. Cypress tuntui työkaluna toimivalta ja aion ehdottomasti käyttää sitä tulevissa projekteissani. Pidin myös paljon graafisesta kattavuusraportista ja itse Cypressin testiohjelman käyttöliittymästä.

Seminaarityö jätti myös paljon lisäopiskelun varaa, sillä kuten mainittu, Cypress on loistava työkalu myös esimerkiksi yksikkötestaamiseeen (jonka puutteesta kattavuusraporttini keltaiset kohdat johtuivat). Minusta olisikin tulevaisuudessa kiinnostavaa toteuttaa kattavat yksikkö-, integraatio- ja järjestelmätestit johonkin sovellukseen Cypressiä käyttäen.