const HTML = {
    PRODUCT_LIST : {
        PRODUCT_ITEM : (product) => `
            <tr>
                <td><input type="checkbox"/></td>
                <td>${product.sku}</td>
                <td>${product.name}</td>
                <td style="${descriptionCss()}">${product.description}</td>
                <td>${product.product_unit}</td>
                <td>
                    <div class="d-flex">
                    ${renderColor(product.color)}
                    </div>
                </td>
                <td>${product.size ? product.size.join(', ') : ''}</td>
                <td>${product.export_price.toLocaleString()}</td>
                <td>${product.category.name}</td>
            </tr>
        `,

        PAGINATION_ITEM : (pageNum) => `
            <li class="page-item page-num page-num-${pageNum}"><div class="page-link">${pageNum}</div></li>
        `

        
    }
}


//color : {
//  code : 
//  name :    
//}
const renderColor = (colorList) => {
    if (!colorList) return ``;
    let html = ``;
    colorList.forEach(color => {
        html += `<div style="${colorCss(color.code)}"></div>`;
    });
    return html;
}

const colorCss = (colorCode) => {
    return `
        background-color: ${colorCode}; 
        width: 10px; 
        height: 10px ; 
        margin-left: 10px; 
        border-radius: 50%;
    `
}

const descriptionCss = () => {
    return `
        max-width: 200px;
        text-overflow: ellipsis;
        white-space: nowrap;
        overflow: hidden;   
    `
}
