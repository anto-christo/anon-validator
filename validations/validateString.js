const { EOL } = require('os');
const { ValidationError } = require('../utils/error');
const _ = require('../utils/message');

/**
 * Function to validate a string
 * @param {String} content 
 * @param {Number} i Current position in file
 * @param {Boolean} isValue true if value, false if key
 * @returns 
 */
const validateString = (content, i, isValue = false) => {
    i++;
    
    // Validate triple quotes for values
    if (isValue && content.substring(i, i + 2) === '""') {
        i += 2;

        //Validate escape sequnces and loop till " is found
        while (content[i] !== '"' || content[i-1] === '\\') {
            i++;
        }

        //If triple closing quote is not found
        if (content.substring(i, i + 3) !== '"""') {
            throwMissingQuoteError(content, i);
        }

        i += 2;
    } else {
        //Validate escape sequnces and loop till " is found
        while (content[i] !== '"' || content[i-1] === '\\') {
            i++;

            //Check is " is not found but end of line is reached
            if (content.substring(i, i + EOL.length) === EOL) {
                throwMissingQuoteError(content, i);
            }
        }
    }

    //Check if not exceeding beyond file content
    if (i >= content.length) {
        throw new ValidationError({
            content,
            message: _.MISSING_CHARACTER,
            expected: '}',
            position: i
        });
    }

    return i;
}

/**
 * Function to throw missing quote error
 * @param {String} content 
 * @param {Number} i Current location in file content 
 */
const throwMissingQuoteError = (content, i) => {
    throw new ValidationError({
        content,
        message: _.MISSING_CHARACTER,
        expected: '"',
        position: i
    });
}

module.exports = validateString;