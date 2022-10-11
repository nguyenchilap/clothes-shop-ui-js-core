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

        COLOR_ITEM: (code, name) => `
                    <li style="margin-left: 20px;">
                        <div class="d-flex product-color-item align-items-center">
                            <div style="background-color: ${code}; width: 20px; height: 20px; border-radius: 50%; margin-right: 4px;"></div>
                            <div>${name}</div>
                            <button class="btn btn-custom-small delete-color-btn" code=${code} name=${name}>x</button>
                        </div>
                    </li>`,
        
        CATEGORY_ROOT: (category) => `
                    <li class='parent-${category.id}'>
                        <div class="dropdown-item" categoryId='${category.id}'>${category.name}</div>
                        <ul class="dropdown-menu dropdown-submenu"></ul>
                    </li>
                    `,
        CATEGORY_CHILD: (category) => `
                    <li categoryId=${category.id}>
                        <div class="dropdown-item dropdown-subitem">${category.name}</div>
                    </li>
                    `
        
    }
}

