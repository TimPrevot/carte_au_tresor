import * as fs from "fs";
import Mountain from "./mountain"
import TreasureSpot from "./treasure_spot";
import Adventurer from "./adventurer";
import { readAdventurer, readEntryFile, readMountain, readTreasureSpot } from "./functions";

// Variables pour stocker les dimensions de la carte
let verticalLength = 0;
let horizontalLength = 0;

// Variable pour stocker le nombre maximum de déplacements qui seront effectués par un même aventurier
let maxMoves = 0;

// Booléens pour assurer la gestion des obstacles (montagnes et autres aventuriers)
let noMountains = true;
let noCompetitors = true;

const mountains: Mountain[] = [];
const treasureSpots: TreasureSpot[] = [];
const adventurers: Adventurer[] = [];

let splitFile = readEntryFile();
// On lit le fichier d'entrée ligne par ligne
for (let i = 0; i < splitFile.length; i++) {
    switch (splitFile[i][0]){
        // On stocke les dimensions de la carte dans les variables correspondantes
        case 'C':
            horizontalLength = parseInt(splitFile[i][2]);
            verticalLength = parseInt(splitFile[i][4]);
            break;
        // Pour chaque montagne, on crée une instance de Montagne que l'on stocke dans le tableau correspondant
        case 'M':
            let mountain = readMountain(splitFile[i], horizontalLength, verticalLength);
            mountain ? mountains.push(mountain) : console.log("La montagne en (", splitFile[i][2], ",", splitFile[i][4], ") est hors limites !");
            break;

        // Pour chaque trésor, on crée une instance de TreasureSpot que l'on stocke dans le tableau correspondant
        case 'T':
            let treasureSpot = readTreasureSpot(splitFile[i], horizontalLength, verticalLength);
            treasureSpot ? treasureSpots.push(treasureSpot) : parseInt(splitFile[i][6]) <= 0 ? console.log("Le spot ne contient pas de trésor !") : console.log("Le trésor en (", splitFile[i][2], ",", splitFile[i][4], ") est hors limites !");
            break;

        // Pour chaque aventurier, on crée une instance de Adventurer que l'on stocke dans le tableau correspondant
        case 'A':
            const adventurerParams: string[] = splitFile[i].split("-");
            let adventurer = readAdventurer(adventurerParams, horizontalLength, verticalLength);
            adventurer ? adventurers.push(adventurer) : console.log("L'aventurier ", adventurerParams[1], " en (", adventurerParams[2], ",", adventurerParams[3], ") est hors limites !");
            if (adventurerParams[5].length > maxMoves && adventurer)
                maxMoves = adventurerParams[5].length;
            break;
        default:
            break;
    }
}

// On simule les déplacements des aventuriers
while (maxMoves > 0) {
    adventurers.forEach((adventurer) => {
        // On déplace chaque aventurier dans l'ordre du tableau (qui correspond à l'ordre du fichier d'entrée)
        switch (adventurer.movements[0]) {

            // Si l'aventurier doit avancer
            case 'A':
                if (adventurer.orientation === 'N') {

                    // On vérifie si une montagne bloque le déplacement de l'aventurier
                    mountains.forEach((mountain) => {
                        if (mountain.horizontalPos === adventurer.horizontalPos && mountain.verticalPos === adventurer.verticalPos - 1) {
                            console.log(adventurer.name, "est bloqué(e) par une montagne !");
                            noMountains = false;
                        }
                    });

                    // On vérifie si un autre aventurier bloque le déplacement de l'aventurier
                    adventurers.forEach((competitor) => {
                        if (competitor.horizontalPos === adventurer.horizontalPos && competitor.verticalPos === adventurer.verticalPos - 1) {
                            console.log(competitor.name, "bloque ", adventurer.name, " !");
                            noCompetitors = false;
                        }
                    });

                    // Si l'aventurier n'est pas bloqué et ne va pas sortir des limites de la carte, il se déplace
                    if (noCompetitors && noMountains && adventurer.verticalPos > 0)
                        adventurer.verticalPos--;
                } else if (adventurer.orientation === 'S') {

                    // On vérifie si une montagne bloque le déplacement de l'aventurier
                    mountains.forEach((mountain) => {
                        if (mountain.horizontalPos === adventurer.horizontalPos && mountain.verticalPos === adventurer.verticalPos + 1) {
                            console.log(adventurer.name, "est bloqué(e) par une montagne !");
                            noMountains = false;
                        }
                    });

                    // On vérifie si un autre aventurier bloque le déplacement de l'aventurier
                    adventurers.forEach((competitor) => {
                        if (competitor.horizontalPos === adventurer.horizontalPos && competitor.verticalPos === adventurer.verticalPos + 1) {
                            console.log(competitor.name, "bloque ", adventurer.name, " !");
                            noCompetitors = false;
                        }
                    });

                    // Si l'aventurier n'est pas bloqué et ne va pas sortir des limites de la carte, il se déplace
                    if (noCompetitors && noMountains && adventurer.verticalPos < verticalLength)
                        adventurer.verticalPos++;
                } else if (adventurer.orientation === 'O') {

                    // On vérifie si une montagne bloque le déplacement de l'aventurier
                    mountains.forEach((mountain) => {
                        if (mountain.horizontalPos === adventurer.horizontalPos - 1 && mountain.verticalPos === adventurer.verticalPos) {
                            console.log(adventurer.name, "est bloqué(e) par une montagne !");
                            noMountains = false;
                        }
                    });

                    // On vérifie si un autre aventurier bloque le déplacement de l'aventurier
                    adventurers.forEach((competitor) => {
                        if (competitor.horizontalPos === adventurer.horizontalPos - 1 && competitor.verticalPos === adventurer.verticalPos) {
                            console.log(competitor.name, "bloque ", adventurer.name, " !");
                            noCompetitors = false;
                        }
                    });

                    // Si l'aventurier n'est pas bloqué et ne va pas sortir des limites de la carte, il se déplace
                    if (noCompetitors && noMountains && adventurer.horizontalPos > 0)
                        adventurer.horizontalPos--;
                } else if (adventurer.orientation === 'E') {

                    // On vérifie si une montagne bloque le déplacement de l'aventurier
                    mountains.forEach((mountain) => {
                        if (mountain.horizontalPos === adventurer.horizontalPos + 1 && mountain.verticalPos === adventurer.verticalPos) {
                            console.log(adventurer.name, "est bloqué(e) par une montagne !");
                            noMountains = false;
                        }
                    });

                    // On vérifie si un autre aventurier bloque le déplacement de l'aventurier
                    adventurers.forEach((competitor) => {
                        if (competitor.horizontalPos === adventurer.horizontalPos + 1 && competitor.verticalPos === adventurer.verticalPos) {
                            console.log(competitor.name, "bloque ", adventurer.name, " !");
                            noCompetitors = false;
                        }
                    });

                    // Si l'aventurier n'est pas bloqué et ne va pas sortir des limites de la carte, il se déplace
                    if (noCompetitors && noMountains && adventurer.horizontalPos < horizontalLength)
                        adventurer.horizontalPos++;
                }
                break;

            // Si l'aventurier doit se tourner vers la droite
            case 'D':
                switch (adventurer.orientation) {
                    case 'N':
                        adventurer.orientation = 'E';
                        break;
                    case 'E':
                        adventurer.orientation = 'S';
                        break;
                    case 'S':
                        adventurer.orientation = 'O';
                        break;
                    case 'O':
                        adventurer.orientation = 'N';
                        break;
                    default:
                        break;
                }
                break;

            // Si l'aventurier doit se tourner vers la gauche
            case 'G':
                switch (adventurer.orientation) {
                    case 'N':
                        adventurer.orientation = 'O';
                        break;
                    case 'E':
                        adventurer.orientation = 'N';
                        break;
                    case 'S':
                        adventurer.orientation = 'E';
                        break;
                    case 'O':
                        adventurer.orientation = 'S';
                        break;
                    default:
                        break;
                }
                break;
            default:
                break;
        }

        // On supprime le premier élément de la liste des mouvements de l'aventurier
        adventurer.movements = adventurer.movements.slice(1);
        noCompetitors = true;
        noMountains = true;

        // On vérifie si un trésor se trouve sur la case où vient d'arriver l'aventurier
        treasureSpots.forEach((treasureSpot) => {
            if (treasureSpot.horizontalPos === adventurer.horizontalPos && treasureSpot.verticalPos === adventurer.verticalPos && treasureSpot.nbTreasures > 0) {
                treasureSpot.nbTreasures--;
                adventurer.treasures++;
                console.log(adventurer.name, "a trouvé un trésor en (", treasureSpot.horizontalPos, ", ", treasureSpot.verticalPos, ") !");
            }
        })
    })
    maxMoves--;
}

// On utilise writeFileSync() en premier pour effacer le précédent contenu du fichier de sortie
// Puis on utilise appendFileSync() pour simplement ajouter une ligne au fichier
// Si le fichier de sortie n'existe pas, il sera créé automatiquement
fs.writeFileSync('exitFile.txt', splitFile[0] + '\n');
mountains.forEach((mountain) => {
    fs.appendFileSync('exitFile.txt', 'M-' + mountain.horizontalPos + '-' + mountain.verticalPos + '\n');
});
treasureSpots.forEach((treasureSpot) => {
    fs.appendFileSync('exitFile.txt', 'T-' + treasureSpot.horizontalPos + '-' + treasureSpot.verticalPos + '-' + treasureSpot.nbTreasures + '\n');
});
adventurers.forEach((adventurer) => {
    fs.appendFileSync('exitFile.txt', 'A-' + adventurer.name + '-' + adventurer.horizontalPos + '-' + adventurer.verticalPos + '-' + adventurer.orientation + '-' + adventurer.treasures + '\n');
})
