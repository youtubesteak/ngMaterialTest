import { 
    Component, 
    OnInit, 
    ViewEncapsulation, 
    EventEmitter, 
    AfterViewInit, 
    AfterViewChecked,
    OnChanges,
    DoCheck 
}        from '@angular/core';
import { Router } from '@angular/router';

import { MdDialog, MdDialogRef } from '@angular/material';

import { DialogComponent } from './dialog';

import { Serial } from './../models/serial';
import { SerialService } from './../providers/serial.service';

@Component({
    selector: 'serial-move',
    template: `
        <div class="serialscontainer">
            <md-card>
                <md-card-title *ngIf="!serials">
                    <span color="primary">1. Enter Serial</span>
                </md-card-title>
                <md-card-content md-dark>
                    <md-input-container class="serial-input">
                        <input 
                            mdInput 
                            #serialinput 
                            class="biginput"
                            (keyup.enter)="searchSerials2(serialinput.value)"
                            [focus]="focusSerial" 
                            (blur)="setFocus()"
                            [disabled]="serials"
                            [(ngModel)]="serialinputvalue"
                            autofocus >
                        <md-icon mdSuffix *ngIf="serialinput.value.length > 0" (click)="clearData()">clear</md-icon>
                        <md-hint align="start" *ngIf="!serials"><strong>Enter Serial Number</strong> </md-hint>
                        <md-hint align="end">{{serialinput.value.length}} / 15</md-hint>
                    </md-input-container>
                </md-card-content>
                <md-card-content *ngIf="selectedSerial">
                    <p>
                        <b>Stockcode:</b>  {{selectedSerial.stockcode}}<br>
                        <b>Warehouse:</b> {{selectedSerial.warehouse}}<br>
                        <b>Lot:</b> {{selectedSerial.lot}}<br>
                        <b>Current Location:</b> {{selectedSerial.location}}<br>
                        <b>QtyOnHand:</b> {{selectedSerial.qtyonhand}}<br>
                        <b>QtyAvailable:</b> {{selectedSerial.qtyavailable}}<br>
                    </p>
                </md-card-content>
            </md-card>
            <md-progress-spinner *ngIf="searching" style="margin:0 auto;" mode="indeterminate"></md-progress-spinner>
            <md-nav-list *ngIf="serials && !selectedSerial" class="serialslist">
                <h3 md-header *ngIf="serials.length > 1">1B. Found multiple Serials with this value. Please specify serial:</h3>
                <md-divider></md-divider>
                <a md-list-item
                    class="serial-item"
                    *ngFor="let serial of serials"
                    [class.selected]="serial === selectedSerial"
                    (click)="onSelect(serial)"
                >
                    <h3 md-line> <b>{{serial.serial}}</b> </h3>
                    <p md-line>
                        <span> {{serial.stockcode}} </span>
                        <span class="demo-2"> | {{serial.warehouse}} </span>
                    </p>
                </a>
            </md-nav-list>
            <br>
            <md-card *ngIf="selectedSerial">
                <md-card-title>
                    2. Enter Location
                </md-card-title>
                <md-card-content>
                        <md-input-container class="serial-input">
                            <input 
                                mdInput 
                                placeholder="Location"
                                #locationinput 
                                class="biginput"
                                [focus]="focusLocation" 
                                (blur)="setFocus()"
                                [disabled]="!selectedSerial"
                                [(ngModel)]="locationinputvalue"
                                value="">
                            <md-icon mdSuffix *ngIf="locationinput.value.length > 0" (click)="clearLocationInput()">clear</md-icon>
                            <md-hint align="start"><strong>Enter location you are moving {{selectedSerial.serial}} to.</strong> </md-hint>
                        </md-input-container>
                </md-card-content>
                <md-card-actions>
                    <button 
                        md-raised-button 
                        color="warn" 
                        (click)="failDialog()"
                        [disabled]="!locationinput.value.length > 0"
                    >
                        POST(fail)
                    </button>
                    <button 
                        md-raised-button 
                        color="warn" 
                        (click)="successDialog()"
                        [disabled]="!locationinput.value.length > 0"
                    >
                        POST(success)
                    </button>
                </md-card-actions>
            </md-card>
        </div>
    `,
    styles: [`
        .fixed-fab {
            position: absolute;
            right: 20px;
            bottom: 10px;
        }
        .serialscontainer {
            width: 100%;
            max-width: 100vw;
        }
        .leftpane {
            width: 45%;
            float: left;
            padding: 10px;
        }
        .rightpane {
            margin-left: 50%;
            width: 45%;
            height: 80em;
            padding: 10px;
        }
        .serials-list{
            background: lavender;
        }
        a.serial-item {
            background: white;
            margin: 2px;
            box-shadow: 1px 1px 1px;
        }
        .serial-item.selected {
            background: whitesmoke;
            box-shadow: 1px 1px 1px 1px inset;
        }
        .serial-item.selected:hover {
        }
        .serial-input {
            width: 100%;
        }
        input.biginput {
            font-size: 40px;
        }
    `]/*,
    encapsulation: ViewEncapsulation.None*/
})
export class SerialMoveComponent implements OnInit {

    serials: Serial[];
    selectedSerial: Serial;

    serialinputvalue: string;
    searching: any;
    locationinputvalue: string;

    constructor(
        private router: Router,
        private serialService: SerialService,
        public dialog: MdDialog
    ) { }

    ngOnInit(): void {
        this.searching=false;
        this.serialinputvalue='';
        this.locationinputvalue='';
        this.setFocus();
    }

    clearData(){
        this.serials = Serial[-1];
        this.selectedSerial = Serial[-1];
        this.serialinputvalue = '';
        this.locationinputvalue='';
        this.focusSerial.emit(true);
    }

    clearLocationInput(){
        this.locationinputvalue='';
    }
    

    public focusSerial = new EventEmitter<boolean>();
    public focusLocation = new EventEmitter<boolean>();
    setFocus(){
        if(!this.serials){
            this.focusSerial.emit(true);
        }
        else{
            if(!this.selectedSerial){
            }
            else{
                this.focusLocation.emit(true);
            }
        }
    }

    searchSerials(serial): void {
        if(serial.length > 0){
            this.searching = true;
            //this.serialService.findSerialsSlowly(serial).then(serials => this.serials = serials);
            var testing = this.serialService.findSerialsSlowly(serial)
                .then(serials => this.serials = serials)
                .then();
            console.log(testing);
        }
    }
    searchSerials2(serial: string): void {
        this.searching = true;
        this.serialService.findSerialsSlowly(serial)
            .then(serials => {
                this.searching = false;
                this.serials = serials;            
            })
            .then(serials => {
                if(this.serials.length > 0){
                    if(this.serials.length == 1){
                        this.selectedSerial = this.serials[0];
                    }
                }
            })
            .then(() => {
                this.setFocus();
            });
    }

    onSelect(serial: Serial): void {
        this.selectedSerial = serial;
    }

    selectedOption: string;
    public title: any;
    public content: any;
    public dialogdata: any;

    successDialog(){
        this.dialogdata = {
                    title: 'Success',
                    content: 'The movement successfully posted. Click Ok to start next movement.',
                    buttons: [
                        {title: 'Okay'},
                    ]
                }
        this.openDialog(this.dialogdata);
    }
    failDialog(){
        this.dialogdata = {
                    title: 'Error',
                    content: 'Movement didnt post. Please Retry or Cancel to clear the form and start over',
                    buttons: [
                        { title: 'Retry' },
                        { title: 'Cancel' }
                    ]
                }
        this.openDialog(this.dialogdata);
    }

    openDialog(input) {
        let dialogRef = this.dialog.open(DialogComponent, {
            disableClose: true,
            data: {
                    title: this.dialogdata.title,
                    content: this.dialogdata.content,
                    buttons: this.dialogdata.buttons
                }
        });
        dialogRef.afterClosed().subscribe(result => {
            this.selectedOption = result;
            if(result == "Retry"){
                this.openDialog('');
            }
            else if(result == "Cancel"){
                this.selectedSerial;
            }
            else if(result == "Okay"){
                this.clearData();
                this.focusSerial.emit(true);
            }
        });
    }
}