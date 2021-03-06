import {Component, OnInit, Inject} from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA} from "@angular/material";


@Component({
    selector: 'app-card-display-dialog',
    templateUrl: './card-display-dialog.component.html',
    styleUrls: ['./card-display-dialog.component.css']
})
export class CardDisplayDialogComponent implements OnInit {

    constructor(public matDialogRef: MatDialogRef<CardDisplayDialogComponent>,
                @Inject(MAT_DIALOG_DATA)
                public data: { Word: string, Synonym: string, Antonym: string, General_sense: string, Example_usage: string, editShown: boolean }) {
    }


    Word: string;
    Synonym: string;
    Antonym: string;
    General_sense: string;
    Example_usage: string;
    editShown: boolean;

    // @Input() card: Card;

    ngOnInit() {
        this.Word = this.data.Word;
        this.Synonym = this.data.Synonym;
        this.Antonym = this.data.Antonym;
        this.General_sense = this.data.General_sense;
        this.Example_usage = this.data.Example_usage;
        this.editShown = this.data.editShown;
        console.log(this.data);
        console.log(this.Word);

    }

    setEditShown(value: boolean) {
        this.editShown = value;
    }
}
