const { EOL } = require('os');
const { ValidationError } = require('../utils/error');
const _ = require('../utils/message');

/**
 * Function to skip spaces and comments
 * @param {String} content 
 * @param {Number} i Current Position in file
 * @returns Current Position in file
 */
const jumpSpaces = (content, i)=> {
    i++;
    const spaceChars = [' ', ...EOL];

    //Skip spaces
    while (spaceChars.some(el => el === content[i])) {
        i++;
    }

    //Skip comments till end of line
    if (content[i] === '/' && content[i+1] === '/') {
        while (content.substring(i, i + EOL.length) !== EOL) {
            i++;
        }
        i = jumpSpaces(content, --i);
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

module.exports = jumpSpaces;