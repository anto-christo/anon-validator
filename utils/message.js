/**
 * The text of all messages are maintained in this file
 */

const MISSING_CHARACTER = "Missing Character";
const INVALID_CHARACTER = "Invalid Character";
const UNEXPECTED_CHARACTER = "Unexpected Character";
const NO_ERROR = "Perfect! Your ANON file has no errors!!";
const FILE_NOT_FOUND = "There was a problem reading the file. Please ensure the file path and name is correct";
const INCORRECT_FILE_FORMAT = "File is not of format .anon. Please input a .anon file";
const NO_FILE_PROVIDED = "Please input a file. Example: node index <path_to_file/file_name>.anon";
const EMPTY_FILE = "The file does not have any content to validate";

module.exports = {
    MISSING_CHARACTER,
    INVALID_CHARACTER,
    UNEXPECTED_CHARACTER,
    NO_ERROR,
    FILE_NOT_FOUND,
    INCORRECT_FILE_FORMAT,
    NO_FILE_PROVIDED,
    EMPTY_FILE
}