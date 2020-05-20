import {getLetterMatchCount} from "./index";

describe('getLetterMatchCount', () => {
    const secretWord = 'party';

    test('correct count when no matching', () => {
        const letterMatchCount = getLetterMatchCount('bones', secretWord);
        expect(letterMatchCount).toBe(0);
    });

    test('correct count when 3 matching', () => {
        const letterMatchCount = getLetterMatchCount('train', secretWord);
        expect(letterMatchCount).toBe(3);
    });

    test('correct count when duplicate letters matching', () => {
        const letterMatchCount = getLetterMatchCount('parka', secretWord);
        expect(letterMatchCount).toBe(3);
    });
})