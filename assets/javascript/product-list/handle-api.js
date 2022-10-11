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