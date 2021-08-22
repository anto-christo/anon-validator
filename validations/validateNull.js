/**
 * Function to validate null
 * @param {String} content 
 * @param {Number} i Current position in file
 * @returns Current position in file
 */
const validateNull = (content, i) => {
    if (content[i] === "n") {
        let slicedContent = content.substring(i, i + 4);

        //Skip and dont throw error if value is null
        if (slicedContent === 'null') {
            return i += 3;
        }
    }

    return i;
}

module.exports = validateNull;