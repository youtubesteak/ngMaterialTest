import { Component, OnInit, ViewEncapsulation }        from '@angular/core';
import { Router } from '@angular/router';

import { Hero } from './../models/hero';
import { HeroService } from './../providers/hero.service';

@Component({
    selector: 'heroes',
    template: `
        <div class="heroescontainer">
            <div class="leftpane">
                <md-nav-list>
                    <h3 md-subheader>Heroes</h3>
                    <md-divider></md-divider>
                    <a md-list-item
                        class="hero-item"
                        *ngFor="let hero of heroes"
                        [class.selected]="hero === selectedHero"
                        (click)="onSelect(hero)"
                    >
                        <h3 md-line> {{hero.name}} </h3>
                        <p md-line>
                            <span> {{hero.id}} </span>
                            <span class="demo-2"> -- {{hero.name}} </span>
                        </p>
                    </a>
                    <!--<md-card md-list-item
                        style="margin: 2px;"
                        *ngFor="let hero of heroes"
                        [class.selected]="hero === selectedHero"
                        (click)="onSelect(hero)">
                        <a>
                            <md-card-header>
                                <md-card-title>
                                    {{hero.name}}
                                </md-card-title>
                            </md-card-header>
                            <md-card-content>
                                    {{hero.id}}
                            </md-card-content>
                        </a>
                    </md-card>-->
                </md-nav-list>
            </div>
            <div class="rightpane">
                <h3>Hero Details</h3>
                <div *ngIf="selectedHero">
                    <h2>Hero: {{selectedHero.name | uppercase}}</h2>
                    <h3>Id: {{selectedHero.id}} </h3>
                    <button (click)="gotoDetail()">View Details</button>
                </div>
            </div>
        </div>
    `,
    styles: [`
        .heroescontainer {
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
        .hero-item {
            margin: 2px;
            box-shadow: 1px 1px 1px;
        }
        .hero-item.selected {
            background: whitesmoke;
            box-shadow: 1px 1px 1px 1px inset;
        }
        .hero-item.selected:hover {
        }
        
    `],
    encapsulation: ViewEncapsulation.None
})
export class HeroesComponent implements OnInit {
    heroes: Hero[];
    selectedHero: Hero;

    constructor(
        private router: Router,
        private heroService: HeroService) { }

    getHeroes(): void {
        this.heroService.getHeroes().then(heroes => this.heroes = heroes);
        console.log(this.heroes);
    }

    ngOnInit(): void {
        this.getHeroes();
    }

    onSelect(hero: Hero): void {
        this.selectedHero = hero;
    }

    gotoDetail(): void {
        this.router.navigate(['/herodetail', this.selectedHero.id]);
    }
}