const fs = require('fs');
const path = require('path');

const p = path.join (
    path.dirname(process.mainModule.filename),
    'data',
    'cart.json'
);

module.exports = class Cart { 
    static addProduct(id, productPrice) {
        fs.readFile(p, (err, fileContent) => {
            let cart = {products: [], totalPrice: 0 };
            if (!err) {
                //if there is no error, then we have an existing cart 
                cart = JSON.parse(fileContent);
            }

             // Analyze the cart => Find existing product
            const existingProductIndex = cart.products.findIndex(prod => prod.id === id);
            const existingProduct = cart.products[existingProductIndex];
            let updatedProduct; //declare a new variable to store the updated product

            if(existingProduct) { //if we have an exiting product , we want to increase the quantity
                updatedProduct = { ...existingProduct }; //copy the existing product into the updated product
                updatedProduct.qty = updatedProduct.qty + 1; //increase the quantity by 1   
                cart.products = [...cart.products]; //copy the products array into a new array
                cart.products[existingProductIndex] = updatedProduct; //update the existing product with the updated product
            } else {
                updatedProduct =  {  id: id, qty: 1 };
                cart.products = [...cart.products, updatedProduct];
            }
            cart.totalPrice = cart.totalPrice + +productPrice; //(+)added to [productPrice] convert the string to a number
            fs.writeFile(p, JSON.stringify(cart), err => {
                console.log(err);
            })
        });
       
       
        // Add new product/ incrase quantity
    }
}