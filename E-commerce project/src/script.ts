interface Product {
    title: string;
    image: string;
    price: number;
}

const buttn: HTMLElement = document.getElementById("fetchbuttn")!;
const productcont: HTMLElement = document.getElementById("productContainer")!;
const categoryDropdown: HTMLElement = document.getElementById("categoryDropdown")!;
const categoryList: HTMLElement = document.getElementById("catlist")!;

async function fetchproducts(): Promise<void> {
    const response = await fetch('https://fakestoreapi.com/products');
    console.log(response.status);

    if (!response.ok) {
        throw new Error(`${response.status}`);
    }
    const data: Product[] = await response.json();
    showProducts(data);
    console.log(data);
}

function showProducts(products: Product[]): void {
    productcont.innerHTML = "";

    products.forEach((product) => {
        const proditem = document.createElement("div");
        proditem.classList.add("col-md-4", "col-lg-3");

        proditem.innerHTML = `
      <div class="card h-100 p-2 text-center">
            <img src="${product.image}" class="card-img-top product-img" alt="${product.title}">
            <div class="card-body">
                <h6 class="card-title">${product.title.substring(0, 25)}...</h6>
                <p class="card-text"><strong>Price: ₹${product.price * 80}</strong></p>
                <button class="btn btn-primary">Buy Now</button>
            </div>
        </div>`;

        productcont.appendChild(proditem);
    });
}

async function getCategory(): Promise<void> {
    const response = await fetch('https://fakestoreapi.com/products/categories');
    console.log(response.status);
    if (!response.ok) {
        throw new Error(`Status: ${response.status}`);
    }
    const categories: string[] = await response.json();
    console.log(categories);
    showCategory(categories);
}

function showCategory(categories: string[]): void {
    categoryList.innerHTML = "";

    categories.forEach((cat) => {
        const listItem = document.createElement("li");
        listItem.innerHTML = `<a class="dropdown-item" href="#" onclick="fetchCategoryProducts('${cat}')">${cat}</a>`;
        categoryList.appendChild(listItem);
    });

    categoryList.classList.add("show");
}

categoryDropdown.addEventListener("click", () => {
    if (!categoryList.classList.contains("show")) {
        getCategory();
    } else {
        categoryList.classList.remove("show");
    }
});

document.getElementById("fetchall")?.addEventListener("click", function (event: MouseEvent) {
    event.preventDefault();
    document.querySelector('.video-container')?.setAttribute('style', 'display: none');
    fetchproducts();
});