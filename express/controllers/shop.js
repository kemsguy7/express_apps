const Product = require('../models/product');
const Cart = require('../models/cart');

exports.getProducts = (req, res, next) => {
  Product.findAll()
    .then(products => {
      res.render('shop/product-list', {
        prods: products,
        pageTitle: 'All Products',
        path: '/products'
      });
    })
    .catch(err => {
      console.log(err);
    });
};

exports.getProduct = (req, res, next) => {
  const prodId = req.params.productId;
  // Product.findAll({ where: { id: prodId } })
  //   .then(products => {
  //     res.render('shop/product-detail', {
  //       product: products[0],
  //       pageTitle: pr oducts[0].title,
  //       path: '/products'
  //     });
  //   }) 
  //   .catch(err => console.log(err));
  Product.findByPk(prodId)
    .then(product => {
      res.render('shop/product-detail', {
        product: product,
        pageTitle: product.title,
        path: '/products'
      });
    })
    .catch(err => console.log(err));
};

exports.getIndex = (req, res, next) => {
  Product.findAll()
    .then(products => {
      res.render('shop/index', {
        prods: products,
        pageTitle: 'Shop',
        path: '/'
      });
    })
    .catch(err => {
      console.log(err);  
    });
};

exports.getCart = (req, res, next) => {
  req.user
    .getCart()
    .then(cart => {
      return cart
        .getProducts()
        .then(products => {
          res.render('shop/cart', {
            path: '/cart',
            pageTitle: 'Your Cart',
            products: products
          });
        })
        .catch(err => console.log(err));
    })
    .catch(err => console.log(err));
};

exports.postCart = (req, res, next) => {
  const prodId = req.body.productId;
  let fetchedCart;
  let newQuantity = 1;
  req.user
    .getCart()
    .then(cart => {
      fetchedCart = cart;
      return cart.getProducts({ where: { id: prodId } });
    })
    .then(products => {
      let product;
      if (products.length > 0) {
        product = products[0]; //get the first product 
      }

      if (product) { //Add an existing item to the cart
        const oldQuantity = product.cartItem.quantity; //first get the old quantity 
        newQuantity = oldQuantity + 1; //get the new quantity
        return product;
      }
      return Product.findByPk(prodId); //add a new product for the first time, quantity will be equal to value of the newQuantity valriable which == 1
    })
    .then(product => {
      return fetchedCart.addProduct(product, {
        through: { quantity: newQuantity }
      });
    })
    .then(() => {
      res.redirect('/cart');  //redirect to the the cart page 
    })
    .catch(err => console.log(err));
};

exports.postCartDeleteProduct = (req, res, next) => {
  const prodId = req.body.productId;
  req.user
  .getCart().then(cart => { //get the cart for the user
    return cart.getProducts({ where: { id: prodId }});
  }).then(products => {
    const product = products[0];
    return product.cartItem.destroy(); //destroy(Delete the product in the inbetween table )
  })
    .then(result => {
      res.redirect('/cart');  //redirect back to cart page after product deletion 
    }).catch(err => console.log(err));
  
  Product.findByPk(prodId, product => {
    Cart.deleteProduct(prodId, product.price);
    res.redirect('/cart'); 
  });
};

exports.postOrder = (req, res, next) => { //function to create an order
  req.user
    .getCart()
    .then(cart => {
      return cart.getProducts();
    }).then(products => {
      return req.user
        .createOrder()
        .then(order => {
          order.addProducts(
            products.map(product => { //each product need to have a special key or field which is understood by sequelize
              product.orderItem = { quantity : product.cartItem.quantity }; ///gotten from the model definition 
              return product; 
          })
          );
        })
        .catch(err => console.log(err));
    }).then(result => {
      res.redirect('/orders');
    })
    .catch(err => console.log(err));
};  

exports.getOrders = (req, res, next) => {
  res.render('shop/orders', {
    path: '/orders',
    pageTitle: 'Your Orders'
  });
};

exports.getCheckout = (req, res, next) => {
  res.render('shop/checkout', {
    path: '/checkout',
    pageTitle: 'Checkout'
  });
};
