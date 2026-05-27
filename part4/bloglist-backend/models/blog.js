// Exercise 4.2 Blog list step 2
const mongoose = require('mongoose')

const blogSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: false,
  },
  url: {
    type: String,
    required: true,
  },
  likes: Number,
  user: { // Exercise 4.17 Blog List Expansions, step 5
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User' // this is the reference to the User model, enables the use of populate in the controllers
  }
})

blogSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = mongoose.model('Blog', blogSchema)
