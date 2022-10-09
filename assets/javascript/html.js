const HTML = {
    CREATE_PRODUCT_FORM : {

        SIZE_ITEM: (size) => `
                    <li>
                        <div class="d-flex product-size-item">
                            <div class="mt-3">${size}</div>
                            <button class="btn btn-custom-small delete-size-btn" size=${size}>x</button>
                        </div>
                    </li>
                    `,
        
        CATEGORY_ROOT: (category) => `
                    <li><div class="dropdown-item">${category.name}</div></li>
                    `,
        
    
    }
}

