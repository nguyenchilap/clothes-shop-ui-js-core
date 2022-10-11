const ajaxGetApi = (url) => {
    const token = window.localStorage.getItem('apricot_token');
    if (token) {
        return $.ajax({
            url,
            type: "GET",
            headers: {
                'Authorization' : `Bearer ${token}`,
                'Content-Type':'application/json'
            }
        });
    } else return null;
}

const ajaxGetImagesUrl = (inputName) => {
    let formData = new FormData();
    $.each(getInputByFieldName(inputName)[0].files, function(i, file) {
        formData.append('images', file);
    });

    const url = global.url.hostname + global.url.commons.uploadImages;

    const token = window.localStorage.getItem('apricot_token');
    if (token) {
        return $.ajax({
            url,
            type: "POST",
            headers: {
                'Authorization' : `Bearer ${token}`
            },
            cache       : false,
            contentType : false,
            data: formData,
            processData : false
        });
    } else return null;
}

const ajaxCreateProduct = (product) => {
    const url = global.url.hostname + global.url.products.all;
    const token = window.localStorage.getItem('apricot_token');
    console.log(product);
    if (token) {
        return $.ajax({
            url,
            type: "POST",
            headers: {
                'Authorization' : `Bearer ${token}`
            },
            data: JSON.stringify(product),
            dataType: 'json',
            contentType: 'application/json',
            processData: false
        });
    } else return null;
}