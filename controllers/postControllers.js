
const { Post } = require('../models/newsModel')

// Get All
const readPosts = async (req, res) => {
    try {
        let all = await Post.find()

        if(all.length() != 0) {
            res.json(all)
        } else {
            res.statusCode(300).json({ message: 'No Posts Found'})
        }
    } catch (error) {
        res.statusCode(500).json(error)
    }
}

// Get Single
const readPost = async (req, res) => {
    try {
        let id = req.params.id

        let post = await Post.find({ id })

        if (post) {
            res.json(post)
        } else {
            res.statusCode(300).json({ message: 'Post not Found'})
        }
    } catch (error) {
        res.statusCode(500).json(error)
    }
}

// Add Post
const createPost = async (req, res) => {
    try {
        let { author, title, time, post } = req.body

        let news = await Post.find({ title })

        if (news) {
            res.statusCode(300).json({ message: 'Title exists' })
        } else {
            let news = await Post.create({ author, title, time, post })

            res.json({ mesaage: 'Post saved' })
        }
    } catch (error) {
        res.statusCode(500).json(error)
    }
}

// Update Post


// Delete Post


module.exports = { readPosts, readPost, createPost, updatePost, deletePost }