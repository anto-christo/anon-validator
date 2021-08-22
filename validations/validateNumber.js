/**
 * Function to validate numbers
 * @param {String} content 
 * @param {Number} i Current position in file
 * @returns Current position in file
 */
const validateNumber = (content, i) => {
    while (content[i] >= "0" && content[i] <= "9") {
        i++;
    }
    
    return --i;
}

module.exports = validateNumber;