const path = require('path')
const fs = require('fs')
const products = []

const getProductFromFile = (cb) => {
  //using a callback to display the results
  const p = path.join(
    path.dirname(process.mainModule.filename),
    'data',
    'products.json'
  )
  fs.readFile(p, (err, fileContent) => {
    if (err) {
      cb([])
    } else {
      cb(JSON.parse(fileContent))
    }
  })
  return products
}

module.exports = class Product {
  constructor(t) {
    this.title = t
  }

  save() {
    getProductsFromFile()
    fs.readFile(p, (err, fileContent) => {
      let products = []

      products.push(this)
      fs.writeFile(p, JSON.stringify(products), (err) => {
        console.log(err)
      })
    })
  }

  static fetchAll(cb) {
    getProductsFromFile(cb)
  }
}
