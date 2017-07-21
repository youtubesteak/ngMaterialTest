import {Component, Inject} from '@angular/core';

import {MdDialog, MdDialogRef} from '@angular/material';
import {MD_DIALOG_DATA} from '@angular/material';

@Component({
  selector: 'app-dialog',
  template: `
    <h1 md-dialog-title>{{data.title}}</h1>
    <div md-dialog-content>{{data.content}}</div>
    <div md-dialog-actions>
      <button md-button md-dialog-close="{{button.title}}" *ngFor="let button of data.buttons">{{button.title}}</button>
    </div>
  `,
})
export class DialogComponent {
  title: any;
  content: any;
  constructor(public dialogRef: MdDialogRef<DialogComponent>,
  @Inject(MD_DIALOG_DATA) public data: any) {}
}
