const mongoDb = require('mongodb')
const getDb = require('../util/database').getDb

class Product {
  constructor(title, price, description, imageUrl, id, userId) {
    this.title = title
    this.price = price
    this.description = description
    this.imageUrl = imageUrl
    //old this._id = id
    this._id = id ? new mongoDb.ObjectId(id) : null //using mongoDb's ObjectID method to create a new ID
    this.userId = userId
  }

  save() {
    const db = getDb()
    let dbOp
    if (this._id) {
      //update the product
      dbOp = db
        .collection('products')
        //.updateOne({ _id: new mongoDb.ObjectId(this._id) }, { $set: this })
        .updateOne({ _id: this._id }, { $set: this })
    } else {
      dbOp = db.collection('products').insertOne(this)
    }

    return dbOp
      .then((result) => {
        4
        console.log(result)
      })
      .catch((err) => {
        console.log(err)
      })
  }

  static fetchAll() {
    const db = getDb()

    return db
      .collection('products')
      .find()
      .toArray()
      .then((products) => {
        console.log(products)
        return products
      })
      .catch((err) => {
        console.log(err)
      })
  }

  static findById(prodId) {
    const db = getDb() //get access to the database connection
    return db
      .collection('products')
      .find({ _id: new mongoDb.ObjectId(prodId) }) //using mongoDb's ObjectID method to find the product
      .next()
      .then((product) => {
        console.log(product)
        return product
      })
      .catch((err) => {
        console.log(err)
      })
  }

  static deleteById(prodId) {
    const db = getDb()
    return db
      .collection('products')
      .deleteOne({ _id: new mongoDb.ObjectId(prodId) })
      .then((result) => {
        console.log('Deleted')
      })
      .catch((err) => {
        console.log(err)
      })
  }
}

module.exports = Product
