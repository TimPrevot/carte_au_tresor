import fs from "fs";
import Mountain from "./mountain";
import TreasureSpot from "./treasure_spot";
import Adventurer from "./adventurer";

export function readEntryFile(): string[] {
    // Stocke le chemin vers le fichier d'entrée
    const fileName: string = "entry_files/testfile1.txt";
    // On lit le fichier et stocke son contenu dans une String
    let fileContent = fs.readFileSync(fileName, 'utf-8');
    // On splitte la String pour séparer les différentes lignes
    const splitFile: string[] = fileContent.split("\r\n");
    return splitFile;
}

export function readMountain(entryString: string, horizontalLength: number, verticalLength: number): Mountain | null {
    let mountain = null;
    if (0 <= parseInt(entryString[2]) && parseInt(entryString[2]) <= horizontalLength && 0 <= parseInt(entryString[4]) && parseInt(entryString[4]) <= verticalLength) {
         mountain = new Mountain(parseInt(entryString[2]), parseInt(entryString[4]));
    }
    return mountain;
}

export function readTreasureSpot(entryString: string, horizontalLength: number, verticalLength: number): TreasureSpot | null {
    let treasureSpot = null;
    if (0 <= parseInt(entryString[2]) && parseInt(entryString[2]) <= horizontalLength && 0 <= parseInt(entryString[4]) && parseInt(entryString[4]) <= verticalLength && parseInt(entryString[6]) > 0) {
        treasureSpot = new TreasureSpot(parseInt(entryString[2]), parseInt(entryString[4]), parseInt(entryString[6]));
    }
    return treasureSpot;
}

// Vérifie que l'aventurier a une orientation valide (N, E, S ou O)
export function verifyOrientation(orientation: string): boolean {
    if (orientation != 'N' && orientation != 'E' && orientation != 'S' && orientation != 'O')
        return false;
    return true
}

// Vérifie que les mouvements de l'aventurier sont tous valides
export function verifyMoves(moves: string): boolean {
    for (let i = 0; i < moves.length; i++) {
        if (moves[i] != 'A' && moves[i] != 'D' && moves[i] != 'G')
            return false;
    }
    return true;
}

export function readAdventurer(adventurerParams: string[], horizontalLength: number, verticalLength: number): Adventurer | null {
    let adventurer = null;
    if (0 <= parseInt(adventurerParams[2]) && parseInt(adventurerParams[2]) <= horizontalLength && 0 <= parseInt(adventurerParams[3])
        && parseInt(adventurerParams[3]) <= verticalLength && verifyOrientation(adventurerParams[4]) && verifyMoves(adventurerParams[5])) {
        adventurer = new Adventurer(adventurerParams[1], parseInt(adventurerParams[2]), parseInt(adventurerParams[3]),
            adventurerParams[4], adventurerParams[5]);
    }
    return adventurer;
}
