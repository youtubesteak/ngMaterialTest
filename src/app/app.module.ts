import { BrowserModule } from '@angular/platform-browser';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

import { MaterialModule } from './imports/material.module';
import { NgSpinKitModule } from 'ng-spin-kit';

//import { PagesModule } from './imports/pages.module';


import { AppComponent } from './app.component';
import { ROUTES } from './app.routes';

import { HeroService } from './providers/hero.service';
import { SerialService } from './providers/serial.service';

import { FocusDirective } from './directives/focus.directive';

import { DialogComponent } from './pages/dialog';


import { HomeComponent } from './pages/home';

import { TestBedComponent } from './pages/testbed';
import { HeroesComponent } from './pages/heroes';
import { SerialsComponent } from './pages/serials';
import { SerialMoveComponent } from './pages/serialmove';
import { StockCodesComponent } from './pages/stockcodes';

import 'hammerjs';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    TestBedComponent,
    DialogComponent,
    HeroesComponent,
    SerialsComponent,
    SerialMoveComponent,
    FocusDirective
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(ROUTES),
    BrowserAnimationsModule,
    MaterialModule,
    HttpClientModule,
    NgSpinKitModule
  ],
  providers: [
    HeroService,
    SerialService
  ],
  bootstrap: [
    AppComponent
  ],
  entryComponents: [
    DialogComponent
  ]
})
export class AppModule { }

platformBrowserDynamic().bootstrapModule(AppModule);
