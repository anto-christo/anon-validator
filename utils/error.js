const VALIDATION_ERROR = "ValidationError";
const FILE_ERROR = "FileError";

/**
 * Class for validation error
 * @param {Object} errorObject 
 */
function ValidationError(errorObject) {
    errorObject.type = VALIDATION_ERROR;
    this.errorObject = errorObject;
}

/**
 * Class for file error
 * @param {String} message 
 */
function FileError(message) {
    this.type = FILE_ERROR;
    this.message = message;
}

module.exports = {
    ValidationError,
    FileError
};