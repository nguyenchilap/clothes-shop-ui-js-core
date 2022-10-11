//define common functions

//get element use jquery
const jquerySelector = selector => $(selector);

//get page item user jquery
const pageNumJquerySelector = () => jquerySelector('ul.pagination .page-num-list .page-num');


//get active page item user jquery
const activePageNumJquerySelector = () => jquerySelector('ul.pagination .page-num-list .page-num.active');

//get page left jquery
const pageLeftJquery = () => jquerySelector('.page-left');

//get page right jquery
const pageRightJquery = () => jquerySelector('.page-right');

//get page by number jquery
const pageByNumJquery = (page) => jquerySelector(`ul.pagination .page-num-list .page-num.page-num-${page}`);

//get current page jquery
const currentPageJquery = () => jquerySelector(`ul.pagination .page-num-list .page-item.active .page-link`);
