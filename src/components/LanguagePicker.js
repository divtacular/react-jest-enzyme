import React from 'react';
import propTypes from 'prop-types';

const LanguagePicker = ({setLanguage}) => {
    const languages = [
        { code: 'en', symbol: '🇬🇧'},
        { code: 'emoji', symbol: '😊'}
    ];

    const languageIcons = languages.map(({code, symbol}) => {
        return <span data-test={"language-icon"} key={code} onClick={(e) => setLanguage(code)}>
            {symbol}
        </span>
    });

    return (
        <div data-test={"component-language-picker"}>
            {languageIcons}
        </div>
    );
};

LanguagePicker.propTypes = {
    setLanguage: propTypes.func.isRequired
}

export default LanguagePicker;