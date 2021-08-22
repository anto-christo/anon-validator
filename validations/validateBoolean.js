/**
 * Function validate Boolean values
 * @param {String} content 
 * @param {Number} i Current Position in file
 * @returns Current Position in file
 */
const validateBoolean = (content, i) => {
    if (content[i] === "t") {
        const slicedContent = content.substring(i, i + 4);

        //Skip and dont throw error if boolean value is true
        if (slicedContent === 'true') {
            return i += 3;
        }
    } else if (content[i] === "f") {
        const slicedContent = content.slice(i, i + 5);
        
        //Skip and dont throw error if boolean value is false
        if (slicedContent === 'false') {
            return i += 4;
        }
    }

    return i;
}

module.exports = validateBoolean;