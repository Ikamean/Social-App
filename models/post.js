const mongoose = require('../mongoDB');

const postSchema = new mongoose.Schema({
    content: String,
    likes: Number,
    dislikes: Number,
    comments: Array,
    creationDate: String,
    authorId: String,
    authorPicture: String,
    authorName: String
})

postSchema.set('toJSON', {
    transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
    }
})

module.exports = mongoose.model('Post', postSchema)