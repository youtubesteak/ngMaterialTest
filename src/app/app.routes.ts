import { Routes } from '@angular/router';

import { HomeComponent } from './pages/home';

import { TestBedComponent } from './pages/testbed';

import { SerialsComponent } from './pages/serials';
import { SerialMoveComponent } from './pages/serialmove';

//import { StockCodesComponent } from './pages/stockcodes';
//import { PagesModule } from './imports/pages.module';


export const ROUTES: Routes = [
  { path: '', component: HomeComponent },
  { path: 'testbed', component: TestBedComponent },
  { path: 'serials', component: SerialsComponent },
  { path: 'serialmove', component: SerialMoveComponent },
  //{ path: 'stockcodes', component: StockCodesComponent },
  { path: '**', redirectTo: '' }
];