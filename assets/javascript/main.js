(() => {

    const getAccessToken = () => {
        //get token
        $.post(global.url.hostname + global.url.login, {
            "email": "lapnguyen18620@gmail.com",
            "password": "123456"
        }, function(res, status) {
            if (res.meta.ok) {
                window.localStorage.setItem('apricot_token', res.data.token);
            }
            
        });
    }
    
    const app = () => {
        getAccessToken();
    }

    app();

})();