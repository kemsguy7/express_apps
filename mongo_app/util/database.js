const mongodb = require('mongodb')
const MongoClient = mongodb.MongoClient // This is a constructor function that we can use to create a new client

let _db //define an empty variable to store the database connection

const mongoConnect = (callback) => {
  MongoClient.connect() //add mongodb url here
    .then((client) => {
      console.log('Database Connected Successful!')
      _db = client.db()
      callback(client)
    })
    .catch((err) => {
      console.log(err)
    })
}

const getDb = () => {
  if (_db) {
    return _db
  }
  throw 'No database found!'
}

exports.mongoConnect = mongoConnect
module.exports = mongoConnect

// Connect to database
