/**
 * @method getLetterMatchCount
 * @param {string} guessedWord - Guessed word
 * @param {string} secretWord - Secret word
 * @returns {number} - Number of matched letters shared between both words
 */
export function getLetterMatchCount(guessedWord, secretWord) {
    return Array.from(secretWord).filter((letter) => {
        return guessedWord.indexOf(letter) > -1
    }).length;
};