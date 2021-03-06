import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {PlayComponent} from './play.component';
import {Observable} from "rxjs/Observable";
import {Deck} from "../deck/deck";
import {MATERIAL_COMPATIBILITY_MODE} from "@angular/material";
import {DeckService} from "../deck/deck.service";
import {ActivatedRoute, RouterModule} from "@angular/router";
import {SharedModule} from "../shared.module";
import {CardComponent} from "../card-component/card.component";
import {CardState} from "./CardState";
import {By} from "@angular/platform-browser";
import {CUSTOM_ELEMENTS_SCHEMA} from "@angular/core";
import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {ResultsComponent} from "../results/results.component";
import {RouterTestingModule} from "@angular/router/testing";

describe('PlayComponent', () => {
    let component: PlayComponent;
    let cardState: CardState;
    let fixture: ComponentFixture<PlayComponent>;

    let deckServiceStub: {
        getDeck: (id) => Observable<Deck>
    };

    beforeEach(async(() => {

        deckServiceStub = {
            getDeck: (id) => Observable.of({
                _id: {
                    $oid: "test id"
                },
                name: "test deck",
                cards: [
                    {
                        _id: "test id",
                        word: "test word",
                        synonym: "test synonym",
                        antonym: "test antonym",
                        general_sense: "test general_sense",
                        example_usage: "test example_usage",
                    },

                    {
                        _id: "test id",
                        word: "test word",
                        synonym: "test synonym",
                        antonym: "test antonym",
                        general_sense: "test general_sense",
                        example_usage: "test example_usage",
                    },

                    {
                        _id: "test id",
                        word: "test word",
                        synonym: "test synonym",
                        antonym: "test antonym",
                        general_sense: "test general_sense",
                        example_usage: "test example_usage",
                    }
                ]
            })
        };

        @NgModule({
            imports: [CommonModule, RouterTestingModule],
            declarations: [ResultsComponent],
            providers: [],
            entryComponents: [
                ResultsComponent,
            ],
            schemas: [CUSTOM_ELEMENTS_SCHEMA]
        })
        class TestDialog {
        }

        TestBed.configureTestingModule({
            imports: [SharedModule, TestDialog, CommonModule],
            declarations: [PlayComponent, CardComponent,],
            providers: [{provide: MATERIAL_COMPATIBILITY_MODE, useValue: true},
                {provide: DeckService, useValue: deckServiceStub}, {
                    provide: ActivatedRoute,
                    useValue: {
                        params: Observable.of({id:"test id"})
                    }
                }],
            schemas: [CUSTOM_ELEMENTS_SCHEMA]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(PlayComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should add to cardStates array', () => {
        let card_state: CardState;
        card_state = component.getCardState(0);
        expect(component.cardStates[0]).toEqual(card_state);
    });

    it('should add points correctly based on certain card states', () => {
        let card_state1: CardState;
        let card_state2: CardState;
        let card_state3: CardState;


        card_state1 = component.getCardState(0);
        card_state2 = component.getCardState(1);
        card_state3 = component.getCardState(2);
        expect(component.cardStates.length).toEqual(3);
        card_state1.randomizeSages();

        card_state2.randomizeSages();
        card_state2.randomizeSages();

        card_state3.randomizeSages();
        card_state3.randomizeSages();
        card_state3.randomizeSages();

        component.addPoints(0);
        expect(component.points1).toEqual(card_state1.cardPoints);

        component.addPoints(1);
        expect(component.points2).toEqual(card_state2.cardPoints);

        component.addPoints(2);
        expect(component.points1).toEqual(card_state1.cardPoints + card_state3.cardPoints);

    });

    it('should increase page number when adding points', () => {
        let card_state1: CardState;
        let de = fixture.debugElement.query(By.css('.card-peek-fab'));
        card_state1 = component.getCardState(0);

        component.addPoints(0);
        expect(component.pageNumber).toEqual(1);
    });

    it("should have a peek-button", () => {
        let de = fixture.debugElement.query(By.css('.card-peek-fab'));
        let el = de.nativeElement;

        expect(el).toBeTruthy();
    })

});
