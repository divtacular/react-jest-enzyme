import React, {useContext} from 'react';
import PropTypes from 'prop-types';

import languageContext from "../contexts/languageContext";
import stringsModule from "../helpers/strings";

/**
 * @desc Functional react component for success message
 * @returns {JSX.Element} - Rendered component or null is props.success is false
 * @constructor
 */
const Congrats = ({success}) => {

    const language = useContext(languageContext);

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

Congrats.propTypes = {
  success: PropTypes.bool.isRequired
};

export default Congrats;