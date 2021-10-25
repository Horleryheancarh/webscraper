
const express = require('express')
const { readPosts, readPost, createPost, updatePost, deletePost } = require('..//controllers/postControllers')


const Router = express.Router()

// Get All Posts
Router.get('/post', readPosts)

// Get Single Post
Router.get('/post/:id', readPost)

// Create Single Post
Router.post('/post', createPost)

// Update Post
Router.put('/post', updatePost)

// Delete Post
Router.delete('/post', deletePost)


module.exports = Router
