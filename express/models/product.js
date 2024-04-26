const path = require('path')
const fs = require('fs')
const products = []

const p = path.join(
  path.dirname(process.mainModule.filename),
  'data',
  'products.json'
)

const getProductFromFile = (cb) => {
  //using a callback to display the results

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
    getProductFromFile((products) => {
      products.push(this)
      fs.writeFile(p, JSON.stringify(products), (err) => {
        console.log(err)
      })
    })
  }

  static fetchAll(cb) {
    getProductFromFile(cb)
  }
}
