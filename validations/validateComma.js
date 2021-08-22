const { ValidationError } = require('../utils/error');
const _ = require('../utils/message');

/**
 * Function to validate comma
 * @param {String} content 
 * @param {Number} i Current position in file
 * @returns Current position in file
 */
const validateComma = (content, i)=> {
    if (content[i] !== ',') {
        throw new ValidationError({
            content,
            message: _.MISSING_CHARACTER,
            expected: ', before this key-value pair',
            position: i
        });
    }
    
    return i;
}

module.exports = validateComma;