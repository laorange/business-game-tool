import abilityData from "../abilityData.json";

export type Production = "P1" | "P2" | "P3" | "P4"
export type Direction = "研发" | "生产" | "销售"
export type Level = "A" | "B" | "C" | "D"

export class Person {
  public production: Production;
  public direction: Direction;
  public level: Level;

  constructor(
    production: Production,
    direction: Direction,
    level: Level,
  ) {
    this.production = production;
    this.direction = direction;
    this.level = level;
  }

  getAbility(): number {
    return abilityData[this.production][this.direction][this.level];
  }

  static parseStr(userInput: string): Person[] {
    const lines = userInput.split("\n");
    const persons: Person[] = [];

    for (const line of lines) {
      let direction: Direction;
      if (line.indexOf("研发") !== -1) direction = "研发";
      else if (line.indexOf("生产") !== -1) direction = "生产";
      else if (line.indexOf("销售") !== -1) direction = "销售";
      else continue;

      let production: Production;
      if (line.indexOf("P1") !== -1) production = "P1";
      else if (line.indexOf("P2") !== -1) production = "P2";
      else if (line.indexOf("P3") !== -1) production = "P3";
      else if (line.indexOf("P4") !== -1) production = "P4";
      else continue;

      let level: Level;
      if (line.indexOf(" A ") !== -1) level = "A";
      else if (line.indexOf(" B ") !== -1) level = "B";
      else if (line.indexOf(" C ") !== -1) level = "C";
      else if (line.indexOf(" D ") !== -1) level = "D";
      else continue;

      persons.push(new Person(production, direction, level));
    }

    return persons;
  }
}
