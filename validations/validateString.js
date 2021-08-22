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
    if (isValue && content.substring(i, i + 2) === '""') {
        i += 2;
        while (content[i] !== '"' || content[i-1] === '\\') {
            i++;
        }
        if (content.substring(i, i + 3) !== '"""') {
            throw new ValidationError({
                content,
                message: _.MISSING_CHARACTER,
                expected: '"',
                position: i
            });
        }
        i += 2;
    } else {
        while (content[i] !== '"' || content[i-1] === '\\') {
            i++;
            if (content.substring(i, i + EOL.length) === EOL) {
                throw new ValidationError({
                    content,
                    message: _.MISSING_CHARACTER,
                    expected: '"',
                    position: i
                });
            }
        }
    }
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

module.exports = validateString;