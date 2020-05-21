import stringsModule from "../helpers/strings";

const {getStringByLanguage} = stringsModule;

const strings = {
    en: {
        submit: 'submit'
    },
    emoji: {
        submit: '🚀'
    },
    mermish: {}
}

describe('language string testing', () => {
    const mockWarn = jest.fn();
    let consoleWarn;

    beforeEach(() => {
        consoleWarn = console.warn; //Copy to be able to reset after tests run
        console.warn = mockWarn
    });

    afterEach(() => {
        console.warn = consoleWarn;
    });

    test('returns correct submit string for English', () => {
        const string = getStringByLanguage('en', 'submit', strings);
        expect(string).toBe('submit');
        expect(console.warn).not.toHaveBeenCalled();
    });

    test('returns correct submit string for emoji', () => {
        const string = getStringByLanguage('emoji', 'submit', strings);
        expect(string).toBe('🚀');
        expect(console.warn).not.toHaveBeenCalled();
    });

    test('returns English submit string when language does not exist', () => {
        const string = getStringByLanguage('notALanguage', 'submit', strings);
        expect(string).toBe('submit');
        expect(console.warn).toHaveBeenCalledWith("Could not get string [submit] for [notALanguage]");
    });

    test('returns English submit string when key does not exist in given language', () => {
        const string = getStringByLanguage('mermish', 'submit', strings);
        expect(string).toBe('submit');
        expect(console.warn).toHaveBeenCalledWith("Could not get string [submit] for [mermish]");
    });
});