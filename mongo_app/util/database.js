const mongodb = require('mongodb')
const MongoClient = mongodb.MongoClient

let _db

const mongoConnect = (callback) => {
  MongoClient.connect(
    'mongodb+srv://mattidungafa:zwLBWV7NRxwq2W2l@cluster0.grapefc.mongodb.net/shop?retryWrites=true&w=majority&appName=Cluster0'
  )
    .then((client) => {
      console.log('Database Connected Successful!')
      _db = client.db()
      callback(client)
    })
    .catch((err) => {
      console.log(err)
      throw err
    })
}

const getDb = () => {
  if (_db) {
    return _db
  }
  throw 'No database found!'
}

exports.mongoConnect = mongoConnect
exports.getDb = getDb // Ensure getDb is exported
