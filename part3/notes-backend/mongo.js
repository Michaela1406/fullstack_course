const mongoose = require('mongoose')

if (process.argv.length < 3) {
  console.log('give password as argument')
  process.exit(1)
}

const password = process.argv[2]

const url = `mongodb+srv://michaela_db_user:${password}@cluster0.tq8oijj.mongodb.net/noteApp?appName=Cluster0`

mongoose.set('strictQuery',false)

mongoose.connect(url, { family: 4 })

const noteSchema = new mongoose.Schema({  // define the schema for the Note model
  content: String,
  important: Boolean,
})

const Note = mongoose.model('Note', noteSchema)  // model name (singular) is Note, collection name (plural) is notes

/*const note = new Note({
  content: 'HTML is easy',
  important: true,
})


note.save().then(result => {
  console.log('note saved!')
  mongoose.connection.close()
})
*/

Note.find({}).then(result => {
  result.forEach(note => {
    console.log(note)
  })
  mongoose.connection.close()
})