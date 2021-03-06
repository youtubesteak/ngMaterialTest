import { Component, OnInit } from '@angular/core';

import { MdDialog, MdDialogRef } from '@angular/material';

import { DialogComponent } from './dialog';

@Component({
  selector: 'app-testbed',
  template: `
    <button md-button (click)="openDialog()">Launch dialog</button>
    You chose: {{selectedOption}}
    
  `,
  styles: [`
  `]
})
export class TestBedComponent {
  selectedOption: string;
  public title: any;
  public content: any;

  constructor(public dialog: MdDialog) {}

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
    });
  }
}
