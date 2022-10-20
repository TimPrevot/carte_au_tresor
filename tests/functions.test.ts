import { describe, expect, test } from '@jest/globals';
import {readAdventurer, readMountain, readTreasureSpot, verifyMoves, verifyOrientation} from "../src/functions";
import Mountain from "../src/mountain";
import TreasureSpot from "../src/treasure_spot";
import Adventurer from "../src/adventurer";

describe('readEntryFile', () => {
    test('readMountain returns a Mountain', () => {
        expect(readMountain('M-2-2', 4, 5)).toStrictEqual(new Mountain(2, 2));
    });
    test('readMountain returns null if out of bounds', () => {
        expect(readMountain('M-6-7', 4, 5)).toBe(null);
    });
    test('readTreasureSpot returns a TreasureSpot', () => {
        expect(readTreasureSpot('T-4-3-2', 4, 5)).toStrictEqual(new TreasureSpot(4, 3, 2));
    });
    test('readTreasureSpot return null if out of bounds', () => {
        expect(readTreasureSpot('T-7-7-4', 4, 5)).toBe(null);
    });
    test('readTreasureSpot returns null if no treasure', () => {
        expect(readTreasureSpot('T-3-2-0', 5, 4)).toBe(null);
    });
    test('verifyMoves returns true if all moves are valid', () => {
        expect(verifyMoves('AADDAAGAADA')).toBe(true);
    });
    test('verifyMoves returns false if a move is not valid', () => {
        expect(verifyMoves('AADDAARAADA')).toBe(false);
    });
    test('verifyOrientation returns true if orientation is valid', () => {
        expect(verifyOrientation('S')).toBe(true);
    });
    test('verifyOrientation returns false if orientation is not valid', () => {
        expect(verifyOrientation('Z')).toBe(false);
    });
    test('readAdventurer returns an Adventurer', () => {
        expect(readAdventurer(['A','Marco','5','3','E','AADAGGAADA'], 6, 5))
            .toStrictEqual(new Adventurer('Marco', 5, 3, 'E', 'AADAGGAADA'));
    });
    test('readAdventurer returns null if out of bounds', () => {
        expect(readAdventurer(['A','Marco','7','3','E','AADAGGAADA'], 6, 4)).toBe(null);
    });
    test('readAdventurer returns null if orientation is not valid', () => {
        expect(readAdventurer(['A','Marco','7','3','R','AADAGGAADA'], 6, 4)).toBe(null);
    });
    test('readAdventurer returns null if a move is not valid', () => {
        expect(readAdventurer(['A','Marco','7','3','S','AADAGGZADA'], 6, 4)).toBe(null);
    });
})