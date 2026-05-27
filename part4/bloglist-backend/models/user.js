// Exercise 4.15 Blog List Expansions, step 3
const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
  username: { // Exercise 4.16 Blog List Expansions, step 4
    type: String,
    required: true,
    minLength: 3,
    unique: true // this ensures the uniqueness of username
  },
  name: String,
  passwordHash: { // Exercise 4.16 Blog List Expansions, step 4
    type: String,
    minLength: 3,
    required: true
  },
  blogs: [ // Exercise 4.17 Blog List Expansions, step 5
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Blog' // this is the reference to the Blog model, enables the use of populate in the controllers
    }
  ]
})

userSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
    // the passwordHash should not be revealed
    delete returnedObject.passwordHash
  }
})

const User = mongoose.model('User', userSchema)

module.exports = User