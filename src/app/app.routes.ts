import { Routes } from '@angular/router';

import { HomeComponent } from './pages/home';
import { TestbedComponent } from './pages/testbed';
import { HeroesComponent } from './pages/heroes';
import { SerialsComponent } from './pages/serials';
import { SerialMoveComponent } from './pages/serialmove';


export const ROUTES: Routes = [
  { path: '', component: HomeComponent },
  { path: 'testbed', component: TestbedComponent },
  { path: 'heroes', component: HeroesComponent },
  { path: 'serials', component: SerialsComponent },
  { path: 'serialmove', component: SerialMoveComponent },
  { path: '**', redirectTo: '' }
];