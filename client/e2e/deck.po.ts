import {browser, element, by} from 'protractor';
import {Key} from "selenium-webdriver";

export class DeckPage {
    navigateTo(deckId: string) {
        return browser.get('/decks/' + deckId);
    }

    getDeckHeader(){
        let header = element(by.id('deck-header')).getText();
        return header;
    }

    getElementsByClass(htmlClass: string){
        return element.all(by.className(htmlClass));
    }
    getAllCards(){
        return this.getElementsByClass('deck-card');
    }

    getNames(object){
        let nameArray: String[];
        nameArray = [];
        for (var i = 0; i < object.length; i++) {
            nameArray[i] = object[i].word
        }
        return nameArray;
    }

    clickButton(id: string) {
        let e = element(by.id(id));
        e.click();
    }

    getElementById(htmlId: string){
        return element(by.id(htmlId));
    }

    typeInput(input: string, text: string, enter?: boolean) {
        let inputElement = element(by.id(input));
        inputElement.click();
        inputElement.sendKeys(text);
        if(enter) {
            inputElement.sendKeys(Key.ENTER);
        }
    }

    addCard(word: string, synonym: string, antonym: string, general: string, example: string) {
        this.clickButton('cardDialog');
        browser.sleep(100);
        this.typeInput('wordInput', word);
        this.typeInput('synInput', synonym);
        this.typeInput('antInput', antonym);
        this.typeInput('genInput', general);
        this.typeInput('exInput', example);
        this.clickButton('new-card-submit');
    }

    // from https://stackoverflow.com/questions/1349404/generate-random-string-characters-in-javascript
    randomText(length: number): string {
        var text: string = "";
        var possible: string = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

        for (var i = 0; i < length; i++)
            text += possible.charAt(Math.floor(Math.random() * possible.length));

        return text;
    }

    changeName (name: string, enter?: boolean) {
        this.clickButton('edit');
        this.clickButton('text-input');

        this.typeInput('text-input', name, false);

        if (!enter) {
            this.clickButton('cancel');
        } else {
            this.clickButton('save');
        }
    }

}
