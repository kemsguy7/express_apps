const fs = require('fs');
const path = require('path');
 
const p = path.join(
  path.dirname(process.mainModule.filename),
  'data',
  'products.json'
);

const getProductsFromFile = cb => {
  fs.readFile(p, (err, fileContent) => {
    if (err) {
      cb([]);
    } else {
      cb(JSON.parse(fileContent));
    }
  });
};

module.exports = class Product {
  constructor(id, title, imageUrl, description, price) {
    this.id = id;
    this.title = title;
    this.imageUrl = imageUrl;
    this.description = description;
    this.price = price; 
  }

  save() {
    getProductsFromFile(products => {  
      if (this.id) {  //editing functionaality if an id exists in the request
        const existingProductIndex = products.findIndex(prod => prod.id === this.id);
        const updatedProducts = [...products];
        updatedProducts[existingProductIndex] = this;
        fs.writeFile(p, JSON.stringify(updatedProducts), err => {
          console.log(err);
        });
      } else { // Add functionality that cre ates new products
        this.id = Math.floor(Math.random().toString()); 
        products.push(this);
        fs.writeFile(p, JSON.stringify(products), err => {
          console.log(err);
        });
      }
    });
  }

  static deleteById(id) {
    getProductsFromFile(products => {
      const productIndex = products.find(prod => prod.id === id); // look for the product with the id
      const updatedProducts = products.filter(prod => prod.id !== id); // copy the products array
      fs.writeFile(p, JSON.stringify(updatedProducts), err => {
        if (!err) {
          Cart.deleteProduct(id, product.price);
        } 
      })
    })
  }
  
  static fetchAll(cb) {
    getProductsFromFile(cb);
  }

  static findById(id, cb) { //fetches products by Id
    getProductsFromFile(products => {
      const product = products.find(p => p.id === id);
      cb(product);
    })
  }

};
