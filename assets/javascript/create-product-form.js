(() => {

    // HANDLE ADD SIZE FIELD =========================================== 
    const handleAddSizeFormSubmit = () => {
        $('.createProductForm__size form').submit((e) => {
            e.preventDefault();
            const inputField = getInputByFieldName('size');
            if (inputField.val()) {
                global.product.size.push(inputField.val()); 
            }
            renderSizeAddtoGlobalProduct();
            inputField.val('');
        })
    }

    const handleDeleteSizeBtn = () => {
        jquerySelector('.delete-size-btn').click((e) => {
            const size = e.target.getAttribute('size');
            global.product.size.splice(global.product.size.indexOf(size), 1);
            renderSizeAddtoGlobalProduct();
        });
    }

    const renderSizeAddtoGlobalProduct = () => {
        const sizeList = jquerySelector('ul.product-size-list');
        sizeList.html('');
        global.product.size.forEach((size) => {
            sizeList.append(HTML.CREATE_PRODUCT_FORM.SIZE_ITEM(size));
        });
        handleDeleteSizeBtn();
    }
    //=================================================================== 

    //HANDLE CATEGORIES=====================================================
    const getRootCategories = () => {
        const url = global.url.hostname + global.url.categories + "/root";
        return ajaxGetApi(url).done(async (res) => {
            return res;
        });
    }

    const renderRootCategories = async () => {
        const categories = (await getRootCategories()).data.categories;
        const categoryList = jquerySelector('.createProductForm__categories ul');
        categoryList.html('');
        categories.forEach(category => {
            categoryList.append(HTML.CREATE_PRODUCT_FORM.CATEGORY_ROOT(category));
        })
    }

    //===================================================================


    const handleActions = () => {
        handleAddSizeFormSubmit();
    }

    const init = () => {
        renderRootCategories();
    }

    const app = () => {

        init();

        handleActions();
        
    }

    app();

})();