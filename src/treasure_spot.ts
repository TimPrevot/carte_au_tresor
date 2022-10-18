export default class TreasureSpot {
    horizontalPos: number;
    verticalPos: number;
    nbTreasures: number;

    constructor(hori: number, vert: number, treasures: number) {
        this.horizontalPos = hori;
        this.verticalPos = vert;
        this.nbTreasures = treasures;
    }
}
