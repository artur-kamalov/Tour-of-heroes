export interface Hero {
  id: number;
  name: string;
}
export const powers = ["Smart", "Flexible", "Hot", "Weather changer"] as const
type Powers = typeof powers[number] | ""
export class ClassHero {
  constructor(
    public id: number,
    public name: string | "",
    public power: Powers,
    public alterEgo?: string,
  ) {}
}
