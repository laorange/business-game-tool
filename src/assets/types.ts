export type Department = "P1" | "P2" | "P3" | "P4"

export type PersonSubject = "研发人员" | "生产人员" | "销售人员"

export type Level = "A" | "B" | "C" | "D"

export interface AbilityDict {
    "研发能力": number;
    "生产能力": number;
    "销售能力": number;
}

export type AbilityCode = "研发" | "生产" | "销售"

export function get() {

}

export interface DepartmentInfo {
    [key: Department | string]: AbilityDict;
}

export class Person {
    subject: PersonSubject;
    level: Level;
    dept: Department;
    ability: number;

    constructor(subject: PersonSubject, level: Level, dept: Department, ability: number) {
        this.subject = subject;
        this.level = level;
        this.dept = dept;
        this.ability = ability;
    }
}

export interface LocalConfig {
    personStr: string
}

export interface StoreState{
    localConfig: LocalConfig
}
