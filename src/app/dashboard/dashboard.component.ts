import {Component, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import {ClassHero} from "../hero";
import {HeroService} from "../hero.service";
import {RouterLink} from "@angular/router";
import {HeroSearchComponent} from "../hero-search/hero-search.component";

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterLink, HeroSearchComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {
  heroes: ClassHero[] = [];

  constructor(private heroService: HeroService) {
  }

  ngOnInit(): void {
    this.getHeroes();
  }

  getHeroes(): void {
    this.heroService.getHeroes()
        .subscribe(heroes => this.heroes = heroes.slice(1, 5));
  }
}
