import { Component, OnInit, ViewEncapsulation }        from '@angular/core';
import { Router } from '@angular/router';

import { MdDialog, MdDialogRef } from '@angular/material';

import { DialogComponent } from './dialog';

import { Serial } from './../models/serial';
import { SerialService } from './../providers/serial.service';

@Component({
    selector: 'serials',
    template: `
        <div class="serialscontainer">
            <div class="leftpane">
                <md-nav-list *ngIf="serials">
                    <h3 md-subheader>Serials</h3>
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
                <md-progress-spinner *ngIf="!serials" style="margin:0 auto;" mode="indeterminate"></md-progress-spinner>
                <sk-folding-cube></sk-folding-cube>
            </div>
            <div class="rightpane" *ngIf="selectedSerial">
                <h3>Selected Serial</h3>
                <md-card *ngIf="selectedSerial">
                    <md-card-header>
                    </md-card-header>
                    <md-card-title>Serial: {{selectedSerial.serial | uppercase}}</md-card-title>
                    <md-card-subtitle>{{selectedSerial.stockcode}}  |  {{selectedSerial.warehouse}}</md-card-subtitle>
                    <md-card-content>
                        <p>
                            <b>StockCode</b>: {{selectedSerial.stockcode}}<br>
                            <b>Warehouse</b>: {{selectedSerial.warehouse}}<br>
                            <b>Lot:</b> {{selectedSerial.lot}}<br>
                            <b>QtyOnHand</b> {{selectedSerial.qtyonhand}}<br>
                            <b>QtyAvailable</b> {{selectedSerial.qtyavailable}}<br>
                            <!--Popup option selected: {{selectedOption}}-->
                        </p>
                    </md-card-content>
                    <md-card-actions>
                        <button md-raised-button 
                            color="primary" class="action-button"
                            (click)="openDialog()">ACTION</button>
                    </md-card-actions>
                </md-card>
                <br>
                <md-card>
                    <md-card-title> Custom Fields </md-card-title>
                    <md-card-content>
                        Width: {{selectedSerial.width}}<br> 
                    </md-card-content>
                </md-card>
                <p *ngIf="!selectedSerial">No Serial Selected!</p>
            </div>
        </div>
    `,
    styles: [`
        .serialscontainer {
            width: 100%;
        }
        .leftpane {
            width: 50%;
            float: left;
        }
        .rightpane {
            margin-left: 50%;
            height: 80em;
            padding: 10px;
        }
        .serial-item {
            margin: 2px;
            box-shadow: 1px 1px 1px;
        }
        .serial-item.selected {
            background: whitesmoke;
            box-shadow: 1px 1px 1px 1px inset;
        }
        .serial-item.selected:hover {
        }
        .action-button{
            float: right;
            top: -45px;
        }
    `],
    encapsulation: ViewEncapsulation.None
})
export class SerialsComponent implements OnInit {
    serials: Serial[];
    selectedSerial: Serial;
    serialsearching: boolean;

    constructor(
        private router: Router,
        private serialService: SerialService,
        public dialog: MdDialog
    ) { }

    ngOnInit(): void {
        this.getSerials();
    }

    getSerials(): void {
        this.serialService.getSerials().then(serials => this.serials = serials);
        console.log(this.serials);
    }

    onSelect(serial: Serial): void {
        this.selectedSerial = serial;
    }

    selectedOption: string;
    public title: any;
    public content: any;

    openDialog() {
        let dialogRef = this.dialog.open(DialogComponent, {
            disableClose: true,
            data: {
                title: 'This is Dialog Title',
                content: 'This is Dialog Content',
                buttons: [
                    {title: 'Retry'},
                    {title: 'Cancel'}
                ]
            }
        });
        dialogRef.afterClosed().subscribe(result => {
            this.selectedOption = result;
            if(result == "Retry"){
                this.openDialog();
            }
            else if(result == "Cancel"){
                this.selectedSerial;
            }
        });
    }
}