const mongodb = require('mongodb')

const MongoClient = mongodb.MongoClient // This is a constructor function that we can use to create a new client

const mongoConnect = (callback) => {
  MongoClient.connect(
    'mongodb+srv://mattidungafa:zwLBWV7NRxwq2W2l@cluster0.grapefc.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'
  ) //add mongodb url here
    .then((client) => {
      console.log('Connected!')
      callback(result)
    })
    .catch((err) => {
      console.log(err)
    })
}

module.exports = mongoConnect

// Connect to database
