import {Component, OnInit} from '@angular/core';
import {
  NgIf,
  NgFor,
  UpperCasePipe,
} from '@angular/common';
import {FormsModule} from '@angular/forms';

import {ClassHero} from '../hero';
import {HeroService} from "../hero.service";
import {RouterLink} from "@angular/router";
import {HeroFormComponent} from "../hero-form/hero-form.component";

@Component({
  standalone: true,
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css'],
  imports: [
    FormsModule,
    NgIf,
    NgFor,
    UpperCasePipe,
    RouterLink,
    HeroFormComponent
  ],
})

export class HeroesComponent implements OnInit {
  heroes: ClassHero[] = [];

  constructor(private heroService: HeroService) { }

  ngOnInit(): void {
    this.getHeroes();
  }

  getHeroes(): void {
    this.heroService.getHeroes()
        .subscribe(heroes => this.heroes = heroes);
  }

  add(name: string): void {
    name = name.trim();
    if (!name) { return; }
    this.heroService.addHero({ name } as ClassHero)
        .subscribe(hero => {
          this.heroes.push(hero);
        });
  }

  delete(hero: ClassHero): void {
    this.heroes = this.heroes.filter(h => h !== hero);
    this.heroService.deleteHero(hero.id).subscribe();
  }

}
