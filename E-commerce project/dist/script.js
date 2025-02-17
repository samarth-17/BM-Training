"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var _a;
const buttn = document.getElementById("fetchbuttn");
const productcont = document.getElementById("productContainer");
const categoryDropdown = document.getElementById("categoryDropdown");
const categoryList = document.getElementById("catlist");
function fetchproducts() {
    return __awaiter(this, void 0, void 0, function* () {
        const response = yield fetch('https://fakestoreapi.com/products');
        console.log(response.status);
        if (!response.ok) {
            throw new Error(`${response.status}`);
        }
        const data = yield response.json();
        showProducts(data);
        console.log(data);
    });
}
function showProducts(products) {
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
function getCategory() {
    return __awaiter(this, void 0, void 0, function* () {
        const response = yield fetch('https://fakestoreapi.com/products/categories');
        console.log(response.status);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const categories = yield response.json();
        console.log(categories);
        showCategory(categories);
    });
}
function showCategory(categories) {
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
    }
    else {
        categoryList.classList.remove("show");
    }
});
(_a = document.getElementById("fetchall")) === null || _a === void 0 ? void 0 : _a.addEventListener("click", function (event) {
    var _a;
    event.preventDefault();
    (_a = document.querySelector('.video-container')) === null || _a === void 0 ? void 0 : _a.setAttribute('style', 'display: none');
    fetchproducts();
});
