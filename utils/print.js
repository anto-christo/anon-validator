const { EOL } = require('os');
const chalk = require('chalk');
const log = console.log;

/**
 * Function to get the line number and position of the error
 * @param {String} content 
 * @param {Number} position 
 * @returns 
 */
const getErrorLineInfo = (content, position) => {
    let tillPosition = content.substring(0, position + 1).split(EOL);
    let lineNumber = tillPosition.length - 1;
    let line = content.split(EOL)[lineNumber];
    tillPosition.pop()
    return {
        line,
        lineNumber: lineNumber + 1,
        position: position - tillPosition.join(EOL).length
    };
}

/**
 * Function to print the ANON Validator title
 */
const printTitle = () => {
    const ANON_VALIDATOR = "ANON Validator";
    log(chalk.bold.underline.cyanBright(`${EOL}${ANON_VALIDATOR}${EOL}`));
}

/**
 * Function to print the validation error details on the screen
 * @param {Object} errorObject 
 * @param {Object} errorInfo 
 */
const output = (errorObject, errorInfo) => {
    log(chalk.redBright(`${errorObject.type}: ${errorObject.message}`));
    log(chalk.redBright(`Line: ${errorInfo.lineNumber}; Position: ${errorInfo.position}${EOL}`));
    log(chalk.whiteBright(`--> ${errorInfo.line}${EOL}`));
    errorObject.expected && log(chalk.greenBright(`Expected: '${errorObject.expected}'`));
}

/**
 * Function to set the error info
 * @param {Object} param0 
 */
const printErrorDetails = ({ errorObject }) => {
    const errorInfo = getErrorLineInfo(errorObject.content, errorObject.position);
    output(errorObject, errorInfo);
}

/**
 * Function to determine error type
 * @param {*} error 
 */
const printError = error => {
    printTitle();
    if (error.errorObject) {
        printErrorDetails(error);
    } else {
        log(chalk.redBright(`${error.type}: ${error.message}`));
    }
}

/**
 * Function to print success message
 * @param {String} message 
 */
const printSuccess = (message) => {
    printTitle();
    log(chalk.greenBright(message));
}

module.exports = {
    printErrorDetails,
    printError,
    printSuccess
};