export default class Adventurer {
    name: string;
    startingHoriPos: number;
    startingVerticalPos: number;
    horizontalPos: number;
    verticalPos: number;
    orientation: string;
    movements: string;

    constructor(name: string, hori: number, vert: number, orientation: string, movements: string) {
        this.name = name;
        this.startingHoriPos = hori;
        this.horizontalPos = hori;
        this.startingVerticalPos = vert;
        this.verticalPos = vert;
        this.orientation = orientation;
        this.movements = movements;
    }
}