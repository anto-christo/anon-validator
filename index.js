const { readFileSync } = require('fs');
const validateObject = require('./validations/validateObject');
const { printError, printSuccess} = require('./utils/print');
const { FileError } = require('./utils/error');
const _ = require('./utils/message');

/**
* Function validate the anon file
* @param    {String} content Content of the file
* @return   {Boolean}        Returns true if no errors
*/
const validateAnon = (content) => {
    validateObject(content);
    /**
     * The code will only reach here if there are no errors.
     * Return true to validate positive scenarios in tests.
     */
    return true;
}

/**
* Function to read and validate the file
* @return   {String}        File content
*/
const validateFile = () => {
    if (process.argv.length < 3) {
        throw new FileError(_.NO_FILE_PROVIDED);
    }

    const filePath = process.argv.slice(2)[0];

    if (filePath.split(".").pop() !== "anon") {
        throw new FileError(_.INCORRECT_FILE_FORMAT);
    }
    
    try {
        return readFileSync(filePath, 'utf-8');
    } catch(e) {
        throw new FileError(_.FILE_NOT_FOUND);
    }
}

try {
    const content = validateFile();
    validateAnon(content);
    printSuccess(_.NO_ERROR);
} catch (e) {
    printError(e);
}