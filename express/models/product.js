const path = require('path')
const fs = require('fs')
const products = []

module.exports = class Product {
  constructor(t) {
    this.title = t
  }

  save() {
    const p = path.join(
      path.dirname(process.mainModule.filename),
      'data',
      'products.json'
    )
    fs.readFile(p, (err, fileContent) => {
      let products = []
      if (!err) {
        products = JSON.parse(fileContent)
      }
      products.push(this)
      fs.writeFile(p, JSON.stringify(products), (err) => {
        console.log(err)
      })
    })
  }

  static fetchAll() {
    const p = path.join(
      path.dirname(process.mainModule.filename),
      'data',
      'products.json'
    )
    fs.readFile(p, (err, fileContent) => {
      if (err) {
        return []
      } //no need for else block becasue after return the function will stop
      return JSON.parse(fileContent)
    })
    return products
  }
}
