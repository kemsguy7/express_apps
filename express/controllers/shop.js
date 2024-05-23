const Product = require('../models/product');
const Cart = require('../models/cart');

exports.getProducts = (req, res, next) => {
  Product.findAll()
  .then(products => {
    res.render('shop/product-list', {
      prods: products,
      pageTitle: 'All Products',
      path: '/products' 
    })
  })
  .catch(err => {
    console.log(err);
  });
};

exports.getProduct = (req, res, next) => {
  const prodId = req.params.productId;
  Product.findAll({where: {id: prodId } })
     .then(products => {
        res.render('shop/product-detail', {
          product: products[0],  //pass the first element in the array 
          pageTitle: products.title,
          path: '/products'
        });
      }) 
      .catch(err => console.log(err));

      
  // Product.findByPk(prodId)
  // .then(product => {
  //   res.render('shop/product-detail', {
  //     product: product,  //pass the first element in the array 
  //     pageTitle: product.title,
  //     path: '/products'
  //   });
  // })
 
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
  //creating cart with sequelize
  req.user //use this to get the cart associated with a particular user 
  .getCart()
  .then(cart => {
    return cart.getProducts()
    .then(products => {
      res.render('shop/cart',{
        path: '/cart',
        pageTitle: 'Your Cart',
        products: products
      })
    })
    .catch(err => console.log(err));
  })
  .catch(err => console.log(err));


  // Cart.getCart(cart => {
  //   Product.fetchAll(products => {
  //     const cartProducts = [];
  //     for (product of products) {
  //       const cartProductData = cart.products.find(
  //         prod => prod.id === product.id
  //       );
  //       if (cartProductData) {
  //         cartProducts.push({ productData: product, qty: cartProductData.qty });
  //       }
  //     }
  //     res.render('shop/cart', {
  //       path: '/cart',
  //       pageTitle: 'Your Cart',
  //       products: cartProducts
  //     });
  //   });
  //});
};

exports.postCart = (req, res, next) => {
  let prodId = req.body.productId;
  let fetchedCart;
  let newQuantity = 1;
  req.user
  .getCart() //get access to the cart
  .then(cart => {
    fetchedCart = cart; //  
    return cart.getProducts({ where: { id: prodId } });
  })
  .then(products => { 
    let product; 
    if (products.length > 0) {
      product = products[0]; //get the first product 
    } 
    let newQuantity = 1;
    if (product) { //Add an existing item to the cart
      const oldQuantity = product.cartItem.quantity;       //first get the old quantity 
      newQuantity = oldQuantity + 1; //get the new quantity
      return product;
    }
    return Product.findByPk(prodId) //add a new product for the first time, quantity will be equal to value of the newQuantity valriable which == 1
      
  })
  .then(data => {
    return fetchedCart.addProduct(product, {
      through: { quantity: newQuantity}
    })  
  })
  .then(() => {
    res.redirect('/cart');  //redirect to the the cart page 
  })
  .catch(err => console.log(err));
};

exports.postCartDeleteProduct = (req, res, next) => {
  const prodId = req.body.productId;
  Product.findById(prodId, product => {
    Cart.deleteProduct(prodId, product.price);
    res.redirect('/cart');
  });
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
