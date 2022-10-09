//define common functions

//get element use jquery
const jquerySelector = selector => $(selector);

//get input text value
const getInputByFieldName = fieldName => $(`input[name=${fieldName}]`);