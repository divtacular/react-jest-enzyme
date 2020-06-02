import React, {useContext} from 'react';
import PropTypes from 'prop-types';

import successContext from "../contexts/successContext";
import languageContext from "../contexts/languageContext";
import stringsModule from "../helpers/strings";

/**
 * @desc Functional react component for success message
 * @returns {JSX.Element} - Rendered component or null is props.success is false
 * @constructor
 */
const Congrats = () => {

    const language = useContext(languageContext);

    const [success] = successContext.useSuccess();

    if (success) {
        return (<div data-test={"component-congrats"} className={"alert alert-success"}>
            <span data-test={"congrats-message"}>
                {stringsModule.getStringByLanguage(language, 'congrats')}
            </span>
        </div>);
    } else {
        return (
            <div data-test={"component-congrats"}></div>
        );
    }
};

export default Congrats;