import { Component, OnInit, ViewEncapsulation }        from '@angular/core';
import { Router } from '@angular/router';

import { MdDialog, MdDialogRef } from '@angular/material';

import { DialogComponent } from './dialog';

import { StockCode } from './../models/stockcode';
import { StockCodeService } from './../providers/stockcode.service';

@Component({
    selector: 'stockcodes',
    template: `
        <div class="stockcodescontainer">
            <div class="leftpane">
                <md-nav-list *ngIf="stockcodes">
                    <h3 md-subheader>StockCodes</h3>
                    <md-divider></md-divider>
                    <a md-list-item
                        class="stockcode-item"
                        *ngFor="let stockcode of stockcodes"
                        [class.selected]="stockcode === selectedStockCode"
                        (click)="onSelect(stockcode)"
                    >
                        <h3 md-line> <b>{{stockcode.stockcode}}</b> </h3>
                        <p md-line>
                            <span> {{stockcode.stockcode}} </span>
                            <span class="demo-2"> {{stockcode.description}} | {{stockcode.longdesc}} </span>
                        </p>
                    </a>
                </md-nav-list>
                <md-progress-spinner *ngIf="!stockcodes" style="margin:0 auto;" mode="indeterminate"></md-progress-spinner>
                <sk-folding-cube></sk-folding-cube>
            </div>
            <div class="rightpane" *ngIf="selectedStockCode">
                <h3>Selected StockCode</h3>
                <md-card *ngIf="selectedStockCode">
                    <md-card-header>

                    </md-card-header>
                    <md-card-title>StockCode: {{selectedStockCode.stockcode | uppercase}}</md-card-title>
                    <md-card-subtitle>{{selectedStockCode.description}}  |  {{selectedStockCode.longdesc}}</md-card-subtitle>
                    <md-card-content>
                        <p>
                            <b>StockCode</b>: {{selectedStockCode.stockcode}}<br>
                            <b>Description</b>: {{selectedStockCode.description}}<br>
                            <b>LongDesc:</b> {{selectedStockCode.longdesc}}<br>
                            <!--Popup option selected: {{selectedOption}}-->
                        </p>
                    </md-card-content>
                    <md-card-actions>
                        <button md-raised-button 
                            color="primary" class="action-button"
                            (click)="openDialog()" disabled>ACTIONS</button>
                    </md-card-actions>
                </md-card>
                <br>
                <md-card>
                    <md-card-title> Custom Fields </md-card-title>
                    <md-card-content>
                    </md-card-content>
                    <md-card-actions>
                        <button md-raised-button 
                            color="primary" class="action-button"
                            (click)="openDialog()" disabled>EDIT</button>
                    </md-card-actions>
                </md-card>
                <p *ngIf="!selectedStockCode">No StockCode Selected!</p>
            </div>
        </div>
    `,
    styles: [`
        .stockcodescontainer {
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
        .stockcode-item {
            margin: 2px;
            box-shadow: 1px 1px 1px;
        }
        .stockcode-item.selected {
            background: whitesmoke;
            box-shadow: 1px 1px 1px 1px inset;
        }
        .stockcode-item.selected:hover {
        }
        .action-button{
            float: right;
            top: -45px;
        }
    `],
    encapsulation: ViewEncapsulation.None
})
export class StockCodesComponent implements OnInit {
    stockcodes: StockCode[];
    selectedStockCode: StockCode;
    stockcodesearching: boolean;

    constructor(
        private router: Router,
        private stockcodeService: StockCodeService,
        public dialog: MdDialog
    ) { }

    ngOnInit(): void {
        this.getStockCodes();
    }

    getStockCodes(): void {
        this.stockcodeService.getStockCodes().then(stockcodes => this.stockcodes = stockcodes);
        console.log(this.stockcodes);
    }

    onSelect(stockcode: StockCode): void {
        this.selectedStockCode = stockcode;
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
                this.selectedStockCode;
            }
        });
    }
}