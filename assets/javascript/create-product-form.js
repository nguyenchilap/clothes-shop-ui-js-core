(() => {

    // HANDLE ADD SIZE FIELD =========================================== 
    const handleAddSizeFormSubmit = () => {
        $('.createProductForm__size form').submit((e) => {
            e.preventDefault();
            const inputField = getInputByFieldName('size');
            const size = inputField.val();
            if (size) {
                if (global.product.size.indexOf(size) < 0){
                    global.product.size.push(size); 
                }
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
        const url = global.url.hostname + global.url.categories.root;
        return ajaxGetApi(url)
        .done((res) => {
            return res;
        })
        .fail((xhr, status, error) => {
            console.log(xhr);
            return error;
        });   
    }

    const getChildCategories = async (parentId) => {
        const url = global.url.hostname + global.url.categories.child + "?id=" + parentId;
        return ajaxGetApi(url)
        .done((res) => {
            return res;
        })
        .fail((xhr, status, error) => {
            console.log(xhr);
            return error;
        });
    }

    const renderRootCategories = async () => {
        const categories = (await getRootCategories()).data.categories;
        if (!categories) alert('Có lỗi xảy ra.');
        const categoryList = jquerySelector('.createProductForm__categories ul');
        categoryList.html('');
        categories.forEach(category => {
            categoryList.append(HTML.CREATE_PRODUCT_FORM.CATEGORY_ROOT(category));
        });
        handleHoverRootCategories();
    }

    const renderChildCategories = async (parentId) => {
        const categories = (await getChildCategories(parentId)).data.categories;
        if (!categories) alert('Có lỗi xảy ra.');
        const categoryList = jquerySelector(`.createProductForm__categories ul li.parent-${parentId} .dropdown-submenu`);
        if (!categoryList.html()) {
            categories.forEach(category => {
                categoryList.append(HTML.CREATE_PRODUCT_FORM.CATEGORY_CHILD(category));
            });
        }
        handleSelectCategory();
    }

    const handleHoverRootCategories = () => {
        jquerySelector('.createProductForm__categories ul li').hover(async (e) => {
            const parentId = e.target.getAttribute('categoryId');
            await renderChildCategories(parentId);
        });
    }

    const handleSelectCategory = () => {
        jquerySelector('.dropdown-subitem').click((e) => {
            const id = e.target.parentNode.getAttribute('categoryId');
            jquerySelector('#selected-category-id').html(id);
            jquerySelector('#selected-category-name').html(e.target.innerHTML);
            global.product.category = id;
        })  
    }

    //===================================================================

    //HANDLE COLORS======================================================
    const handleAddColorFormSubmit = () => {
        $('.createProductForm__color form').submit((e) => {
            e.preventDefault();
            const codeField = getInputByFieldName('color-code');
            const nameField = getInputByFieldName('color-name');
            if (codeField.val() && nameField.val()) {
                if (!colorExistedInArray(codeField.val(), nameField.val(), global.product.color)) {
                    global.product.color.push({
                        code : codeField.val(),
                        name : nameField.val()
                    }); 
                }
            }
            renderColorAddtoGlobalProduct();
            nameField.val('');
        })
    }

    const handleDeleteColorBtn = () => {
        jquerySelector('.delete-color-btn').click((e) => {
            const code = e.target.getAttribute('code');
            const name = e.target.getAttribute('name');
            global.product.color.splice(global.product.color.indexOf({code, name}), 1);
            renderColorAddtoGlobalProduct();
        });
    }

    const renderColorAddtoGlobalProduct = () => {
        const colorList = jquerySelector('ul.product-color-list');
        colorList.html('');
        global.product.color.forEach((color) => {
            colorList.append(HTML.CREATE_PRODUCT_FORM.COLOR_ITEM(color.code, color.name));
        });
        handleDeleteColorBtn();
    }
    //===================================================================

    
    //HANDLE UPLOAD IMAGE================================================
    
    const getImagesUrl = (inputFieldName) => {
        return ajaxGetImagesUrl(inputFieldName)
        .done((result) => {
            return result;
        })
        .fail((xhr, status, error) => {
            console.log(xhr);
            return error;
        });   
    }

    const handleUploadImage = () => {
        getInputByFieldName('image').change(async () => {
            const url = (await getImagesUrl('image')).data[0];
            global.product.image = url;
        });
    }

    const handleUploadImages = () => {
        getInputByFieldName('images').change(async () => {
            const urls = (await getImagesUrl('images')).data;
            global.product.images = urls;
        })
    }
    //===================================================================

    //CREATE PRODUCT=====================================================
    const createProduct = (product) => {
        return ajaxCreateProduct(product)
        .done((result) => {
            return result;
        })
        .fail((xhr, status, error) => {
            console.log(xhr);
            return error;
        });   
    }

    const handleCreateProductBtn = () => {
        jquerySelector('#create-product-btn').click(async () => {

            let product = {};
            product.name = getInputByFieldName('name').val();
            product.sku = getInputByFieldName('sku').val();
            product.description = getInputByFieldName('description').val();
            product.product_unit = jquerySelector('#product-unit').val();
            product.import_price = getInputByFieldName('import_price').val();
            product.export_price = getInputByFieldName('export_price').val();
            product.special_price = getInputByFieldName('special_price').val();
            product.image = global.product.image;
            product.images = global.product.images;
            product.size = global.product.size;
            product.color = global.product.color;
            product.category = global.product.category;
            product.shop = global.shop.ID;

            const result = (await createProduct(product));
            if (!result.meta.ok) {
                alert(result.data);
            } else {
                alert("Tạo thành công");
            }

        })
    }

    //===================================================================


    const handleActions = () => {
        handleAddSizeFormSubmit();
        handleAddColorFormSubmit();
        handleUploadImage();
        handleUploadImages();
        handleCreateProductBtn();
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