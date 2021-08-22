const jumpSpaces = require('./jumpSpaces');
const validateBoolean = require('./validateBoolean');
const validateComma = require('./validateComma');
const validateNull = require('./validateNull');
const validateNumber = require('./validateNumber');
const validateString = require('./validateString');
const { ValidationError } = require('../utils/error');
const _ = require('../utils/message');

/**
 * Function validate initial character of file
 * @param {String} content 
 * @param {Number} i 
 */
const checkInitialCharacter = (content, i) => {
    if (content[i] !== '{') {
        throw new ValidationError({
            content,
            message: _.UNEXPECTED_CHARACTER,
            expected: '{',
            position: i
        });
    }
}

/**
 * Function to validate objects
 * @param {String} content 
 * @param {Number} i Current position in file
 * @returns Current position in file
 */
const validateObject = (content, i = 0) => {
    checkInitialCharacter(content, i);
    
    i = jumpSpaces(content, ++i);

    let newObject = true;

    while (content[i] !== '}') {
        if (!newObject) {
            i = validateComma(content, i);
            i = jumpSpaces(content, ++i);

            if (content[i] === "}") {
                continue;
            }
        }

        if (content[i] === '"') {
            i = validateString(content, ++i);
            i = jumpSpaces(content, ++i);
        } else {
            throw new ValidationError({
                content,
                message: _.MISSING_CHARACTER,
                expected: '"',
                position: i
            });
        }

        if (content[i] === ':') {
            i = jumpSpaces(content, ++i);
            i = validateValue(content, i);
            i = jumpSpaces(content, ++i);

            newObject = false;
        } else {
            throw new ValidationError({
                content,
                message: _.UNEXPECTED_CHARACTER,
                expected: ':',
                position: i
            });
        }

        if (i >= content.length) {
            throw new ValidationError({
                content,
                message: _.MISSING_CHARACTER,
                expected: '}',
                position: i
            });
        }
    }
    return i;
}

/**
 * Function to validate arrays
 * @param {String} content 
 * @param {Number} i Current position in file
 * @returns Current position in file
 */
 const validateArray = (content, i) => {
    i = jumpSpaces(content, ++i);

    let newArray = true;
    while (content[i] !== ']') {
        if (!newArray) {
            i = validateComma(content, i);
            i = jumpSpaces(content, ++i);

            if (content[i] === "]") {
                continue;
            }
        }

        i = validateValue(content, i);
        i = jumpSpaces(content, ++i);
        newArray = false;

        if (i >= content.length) {
            throw new ValidationError({
                content,
                message: _.MISSING_CHARACTER,
                expected: ']',
                position: i
            });
        }
    }
    return i;
}

/**
 * Function to validate different value types
 * @param {String} content 
 * @param {Number} i Current position in file
 * @returns Current position in file
 */
const validateValue = (content, i) => {
    if (content[i] === '{') {
        i = validateObject(content, i);
    } else if (content[i] === '"') {
        i = validateString(content, ++i, true);
    } else if (content[i] === '[') {
        i = validateArray(content, ++i);
    } else if (content[i] >= "0" && content[i] <= "9") {
        i = validateNumber(content, i);
    } else {
        preI = i;
        i = validateBoolean(content, i);
        i = validateNull(content, i);
        if (preI === i) {
            throw new ValidationError({
                content,
                message: _.INVALID_CHARACTER,
                position: i
            });
        }
    }
    return i;
}

module.exports = validateObject;