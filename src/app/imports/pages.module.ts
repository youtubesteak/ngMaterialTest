import {NgModule} from '@angular/core';
import { HomeComponent } from './../pages/home';
import { TestBedComponent } from './../pages/testbed';
import { DialogComponent } from './../pages/dialog';
import { HeroesComponent } from './../pages/heroes';
import { SerialsComponent } from './../pages/serials';
import { SerialMoveComponent } from './../pages/serialmove';

@NgModule({
    declarations: [
        HomeComponent,
        TestBedComponent,
        DialogComponent,
        HeroesComponent,
        SerialsComponent,
        SerialMoveComponent
    ]
})
export class PagesModule { }