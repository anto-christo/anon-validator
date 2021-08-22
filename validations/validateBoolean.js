/**
 * Function validate Boolean values
 * @param {String} content 
 * @param {Number} i Current Position in file
 * @returns Current Position in file
 */
const validateBoolean = (content, i) => {
    if (content[i] === "t") {
        let slicedContent = content.substring(i, i + 4);
        if (slicedContent === 'true') {
            return i += 3;
        }
    } else if (content[i] === "f") {
        let slicedContent = content.slice(i, i + 5);
        if (slicedContent === 'false') {
            return i += 4;
        }
    }
    return i;
}

module.exports = validateBoolean;