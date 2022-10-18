import * as fs from "fs";
import Mountain from "./mountain"
import TreasureSpot from "./treasure_spot";
import Adventurer from "./adventurer";

// stock the path to the entry file
const fileName: string = "entry_files/testfile1.txt";
// read the file and stock its content in a string
let fileContent = fs.readFileSync(fileName, 'utf-8');
console.log("file : ", fileContent);
// split the string in an array to separate the different lines
const splitFile: string[] = fileContent.split("\r\n");

let verticalLength = 0;
let horizontalLength = 0;
const mountains: Mountain[] = [];
const treasureSpots: TreasureSpot[] = [];
const adventurers: Adventurer[] = [];
for (let i = 0; i < splitFile.length; i++) {
    switch (splitFile[i][0]){
        case 'C':
            horizontalLength = parseInt(splitFile[i][2]);
            verticalLength = parseInt(splitFile[i][4]);
            break;
        case 'M':
            mountains.push(new Mountain(parseInt(splitFile[i][2]), parseInt(splitFile[i][4])));
            break;
        case 'T':
            treasureSpots.push(new TreasureSpot(parseInt(splitFile[i][2]), parseInt(splitFile[i][4]), parseInt(splitFile[i][6])));
            break;
        case 'A':
            const adventurerParams: string[] = splitFile[i].split("-");
            adventurers.push(new Adventurer(adventurerParams[1], parseInt(adventurerParams[2]), parseInt(adventurerParams[3]),
                adventurerParams[4], adventurerParams[5]))
        default:
            break;
    }
}
console.log("map dimensions: ", horizontalLength, " x ", verticalLength);
console.log("mountains: ", mountains);
console.log("treasures: ", treasureSpots);
console.log("adventurers: ", adventurers);

