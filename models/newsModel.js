
const { model, Schema } = require('mongoose')


const postSchema = new Schema ({
    author : {
        type: String
    },
    title : {
        type: String,
        unique: true
    },
    time: { 
        type: String,
    },
    post: {
        type: String,
    },
    source : {
        type: String
    }
})

const Post = model('Post', postSchema)

module.exports = { Post }
