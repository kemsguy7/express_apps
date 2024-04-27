const fs = require('fs');
const path = require('path');

const p = path.join(
    path.dirname(process.mainModule.filename),
    'data',
    'cart.json'
);

module.exports = class Cart {
    static addProduct(id, productPrice) {
        // Fetch the previous cart
        fs.readFile(p, (err, fileContent) => {
            let cart = { products: [], totalPrice: 0};
            if (!err) {  //if there was no erro when fetching file contents 
                cart = JSON.parse(fileContent); 
            }
            // Analyze the cart => Find existing product or not
            const existingProductIndex = cart.products.findIndex(
                prod => prod.id === id
            );
            const existingProduct = cart.products[existingProductIndex];
            let updatedProduct;
            // Add new product / increase quantity
            if (existingProduct) {
                updatedProduct = {...existingProduct};
                updatedProduct.qty = updatedProduct.qty + 1;
                cart.products = [...cart.products];
                cart.products[existingProductIndex] = updatedProduct;
            } else {
                updatedProduct = { id: id, qty: 1};
                cart.products = [...cart.products, updatedProduct];
            }
            cart.totalPrice = cart.totalPrice + +productPrice; //a (+) sign is added to productPrice to convert it to a number 
            fs.writeFile(p, JSON.stringify(cart), err => {
                console.log(err);
            })
        })

        // Add new product / increase quantity

    }
}