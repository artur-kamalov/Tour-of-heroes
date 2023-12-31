import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import {ClassHero, Hero} from './hero';

@Injectable({
  providedIn: 'root',
})
export class InMemoryDataService implements InMemoryDbService {
  constructor() {}
  createDb() {
    const heroes: ClassHero[] = [
      { id: 12, name: 'Dr. Nice', power: "Smart"},
      { id: 13, name: 'Bombasto', power: "Smart"},
      { id: 14, name: 'Celeritas', power: "Weather changer"},
      { id: 15, name: 'Magneta', power: "Smart"},
      { id: 16, name: 'RubberMan', power: "Smart"},
      { id: 17, name: 'Dynama', power: "Smart"},
      { id: 18, name: 'Dr. IQ', power: "Smart"},
      { id: 19, name: 'Magma', power: "Smart"},
      { id: 20, name: 'Tornado', power: "Smart"}
    ];
    return {heroes};
  }

  // Overrides the genId method to ensure that a hero always has an id.
  // If the heroes array is empty,
  // the method below returns the initial number (11).
  // if the heroes array is not empty, the method below returns the highest
  // hero id + 1.
  genId(heroes: Hero[]): number {
    return heroes.length > 0 ? Math.max(...heroes.map(hero => hero.id)) + 1 : 11;
  }
}
