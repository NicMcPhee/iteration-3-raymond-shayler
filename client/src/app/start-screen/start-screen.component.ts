import {Component, OnInit} from '@angular/core';
import {DeckService} from "../deck/deck.service";
import {Deck} from "../deck/deck";

@Component({
    selector: 'app-start',
    templateUrl: './start-screen.component.html',
    styleUrls: ['./start-screen.component.css']
})
export class StartScreenComponent implements OnInit {
    public deck: Deck;

    constructor(public deckService: DeckService) {

    }

    selectDeck(deck) {
        this.deck = deck;
    }

    ngOnInit(): void {
        this.deckService.getDecks();
    }


}
