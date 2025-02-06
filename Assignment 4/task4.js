const Products = [
    { name: "Gaming Laptop Pro", price: 120000, category: "Tech" },
    { name: "Dumbbell Set 20kg", price: 7000, category: "Sports" },
    { name: "Wireless Earbuds", price: 5000, category: "Tech" }
];

const productToUpperCase = Products.map(product => product.name.toUpperCase());
console.log(productToUpperCase);
/*
Output:
[
  'GAMING LAPTOP PRO',
  'DUMBBELL SET 20KG',
  'WIRELESS EARBUDS'
]
*/

const electronicCategory = Products.filter(product => product.category == "Tech");
console.log(electronicCategory);
/*
Output:
[
  { name: 'Gaming Laptop Pro', price: 120000, category: 'Tech' },
  { name: 'Wireless Earbuds', price: 5000, category: 'Tech' }
]
*/

const totalAmount = Products.reduce((acc, product) => acc + product.price, 0);
console.log(totalAmount);
/*
Output:
132000
*/

const discountedPrice = Products
    .filter(product => product.category === "Tech") 
    .map(product => product.price - product.price * 0.1) 
    .reduce((acc, discountedPrice) => acc + discountedPrice, 0); 

console.log(discountedPrice);
/*
Output:
112500
*/
