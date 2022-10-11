(() => {

    let itemPerPage = 4;


    //HANDLE TABLE===================================================
    const getProductsList = (page) => {
        const url = global.url.localHostname + global.url.products.all + '?' 
                                            + 'shop=' + global.shop.ID
                                            + '&limit=' + itemPerPage
                                            + '&page=' + page;
        return ajaxGetApi(url)
        .done((res) => {
            return res;
        })
        .fail((xhr, status, error) => {
            console.log(xhr);
            return error;
        });
    }

    const renderProductsList = async (page) => {
        const res = (await getProductsList(page)).data;
        const products = res.products;
        const pagination = res.pagination;

        if (!products) alert('Có lỗi xảy ra.');
        const productList = jquerySelector('#product-list table tbody');
        productList.html('');
        products.forEach(product => {
            productList.append(HTML.PRODUCT_LIST.PRODUCT_ITEM(product));
        });
        renderPagination(pagination);
    }

    //PAGINATION
    const handleSelectItemPerPage = () => {
        jquerySelector('#item-per-page').change((e) => {
            itemPerPage = e.target.value;
            renderProductsList(1);
        })
    }

    const renderPagination = (pagination) => {
        const pageNumList = jquerySelector('ul.pagination .page-num-list');
        const totalPages = pagination.totalPages;
        const page = pagination.page;
        pageNumList.html('');

        if (totalPages - page <= 5) {
            if (totalPages - 5 > 0) {
                for (let i = totalPages - 5; i <= totalPages; i++) {
                    pageNumList.append(HTML.PRODUCT_LIST.PAGINATION_ITEM(i));
                }
            } else {
                for (let i = 1; i <= totalPages; i++) {
                    pageNumList.append(HTML.PRODUCT_LIST.PAGINATION_ITEM(i));
                }
            }
        } else {
            for (let i = page; i <= page + 2; i++) {
                pageNumList.append(HTML.PRODUCT_LIST.PAGINATION_ITEM(i));
            }
            pageNumList.append(HTML.PRODUCT_LIST.PAGINATION_ITEM('...'));
            for (let i = totalPages - 2; i <= totalPages; i++) {
                pageNumList.append(HTML.PRODUCT_LIST.PAGINATION_ITEM(i));
            }
        }

        if (pagination.prevPage) {
            pageLeftJquery().removeClass('disabled');
        } else {
            pageLeftJquery().addClass('disabled');
        }
        if (pagination.nextPage) {
            pageRightJquery().removeClass('disabled');
        } else {
            pageRightJquery().addClass('disabled');
        } 

        pageByNumJquery(pagination.page).addClass('active');

        handlePageNumClick();
    }

    const handlePageNumClick = () => {
        pageNumJquerySelector().click((e) => {
            activePageNumJquerySelector().removeClass('active');
            e.target.parentElement.classList.add('active');
            if (e.target.innerHTML != '...') {
                renderProductsList(e.target.innerHTML);
            }
        });
    }

    const handleLeftRightPageClick = () => {
        pageLeftJquery().click(() => {
            const page = (Number.parseInt(currentPageJquery().html()) - 1).toString();
            renderProductsList(page);
        });
        pageRightJquery().click(() => {
            const page = (Number.parseInt(currentPageJquery().html()) + 1).toString();
            console.log(page);
            renderProductsList(page);
        });
    }

    //====================================================================

    //Header==========================================================
    const handleSwitchShopBtn = () => {
        jquerySelector(".header_switch-btn").click(() =>{
            if (global.shop === ENV.SHOP.APRICOT) {
                global.shop = ENV.SHOP.BEIGE;
            } else {
                global.shop = ENV.SHOP.APRICOT;
            }
            setShopSession();
            renderProductsList(1);
        }); 
    }

    const setShopSession = () => {
        document.title = global.shop.TEXT;
        jquerySelector('.header__title').html(global.shop.TEXT);
    }
    //=================================================================

    const handleActions = () => {
        handleSwitchShopBtn();
        handleSelectItemPerPage();
        handleLeftRightPageClick();

    }

    const init = () => {
        setShopSession();
        renderProductsList(1);
    }

    const app = () => {

        init();

        handleActions();
    }

    app();

})();