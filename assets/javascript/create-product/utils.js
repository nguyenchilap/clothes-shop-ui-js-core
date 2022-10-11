//define common functions

//get element use jquery
const jquerySelector = selector => $(selector);

//get input text value
const getInputByFieldName = fieldName => $(`input[name=${fieldName}]`);

//check if color existed in array
const colorExistedInArray = (colorCode, colorName, array) => {
    for (let i = 0; i < array.length; i++) {
        if (array[i].code === colorCode && array[i].name === colorName) {
            return true;
        }
    }
    return false;
}