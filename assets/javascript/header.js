(() => {

    const handleSwitchShopBtn = () => {
        jquerySelector(".header_switch-btn").click(() =>{
            if (global.shop === ENV.SHOP.APRICOT) {
                global.shop = ENV.SHOP.BEIGE;
            } else {
                global.shop = ENV.SHOP.APRICOT;
            }
            setShopSession();
        }); 
    }

    const setShopSession = () => {
        document.title = global.shop.TEXT;
        jquerySelector('.header__title').html(global.shop.TEXT);
    }
    
    const init = () => {
        //set initial value on load
        setShopSession();
    }

    const handleActions = () => {
        handleSwitchShopBtn();
    }


    const app = () => {

        init();

        //switch shop btn
        handleActions();

    }

    app();

})();