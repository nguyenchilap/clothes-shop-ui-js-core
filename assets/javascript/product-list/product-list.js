(() => {

    //HANDLE TABLE===================================================
    const getProductsList = () => {
        const url = global.url.localHostname + global.url.products.all + '?shop=' + global.shop.ID;
        return ajaxGetApi(url)
        .done((res) => {
            return res;
        })
        .fail((xhr, status, error) => {
            console.log(xhr);
            return error;
        });
    }

    const renderProductsList = async () => {
        const products = (await getProductsList()).data.products;
        if (!products) alert('Có lỗi xảy ra.');
        const productList = jquerySelector('#product-list table tbody');
        productList.html('');
        products.forEach(product => {
            productList.append(HTML.PRODUCT_LIST.PRODUCT_ITEM(product));
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
            renderProductsList();
        }); 
    }

    const setShopSession = () => {
        document.title = global.shop.TEXT;
        jquerySelector('.header__title').html(global.shop.TEXT);
    }
    //=================================================================

    const handleActions = () => {
        handleSwitchShopBtn();
    }

    const init = () => {
        setShopSession();
        renderProductsList();
    }

    const app = () => {

        init();

        handleActions();
    }

    app();

})();