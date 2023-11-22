import {Component, NgModule, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import {ClassHero, powers} from "../hero";
import {FormsModule} from "@angular/forms";
import {HeroService} from "../hero.service";
import {RouterLink} from "@angular/router";

@Component({
  selector: 'app-hero-form',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './hero-form.component.html',
  styleUrl: './hero-form.component.css'
})
export class HeroFormComponent implements  OnInit{
  heroes: ClassHero[] = [];
  submitted = false;
  powers = powers
  constructor(private heroService: HeroService) { }

  model = new ClassHero(Date.now(), "", "", "");
  onSubmit() {
    this.add(this.model)
    this.submitted = true;
  }
  newHero() {
    this.submitted = false;
    this.model = new ClassHero(Date.now(), '', '', '');
  }
    add({id, name, power, alterEgo}: ClassHero): void {
        // name = name.trim();
        // if (!name) { return; }
        console.log(id)
        this.heroService.addHero({ name, id, power, alterEgo } as ClassHero)
            .subscribe(hero => {
                this.heroes.push(hero);
            });
    }
    ngOnInit(): void {
        this.getHeroes();
    }

    getHeroes(): void {
        this.heroService.getHeroes()
            .subscribe(heroes => this.heroes = heroes);
    }
    delete(hero: ClassHero): void {
        console.log(this.heroes)
        console.log(this.heroes.at(-1)!.id)
        console.log(hero.id)
        this.heroes = this.heroes.filter(h => h.id !== hero.id);
        console.log(this.heroes)
        this.heroService.deleteHero(hero.id).subscribe()
    }
}
