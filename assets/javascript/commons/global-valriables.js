let global = {

    //Shop 
    shop: ENV.SHOP.APRICOT,

    //Product for create form
    product: {
        size: [],
        color: [],
        category: 0,
        image: '',
        images: []
    },

    //URL
    url: {
        hostname: 'https://apricot-admin.herokuapp.com/api',
        localHostname: 'http://localhost:8080/api',

        login: '/login',

        commons: {
            uploadImages: '/commons/upload-images'
        },

        categories: {
            all: '/categories',
            root: '/categories/root',
            child: '/categories/child'
        },

        products: {
            all: '/products',
        }
    },

    //TOKEN
    access_token: '',
}