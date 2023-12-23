const blogsRouter = require('express').Router()
const jwt = require('jsonwebtoken')
const { restart } = require('nodemon')
const User = require('../models/user')
const Blog = require('../models/blog')


blogsRouter.get('/', async (req, res) => {
    const blogs = await Blog.find({}).populate('user', { 
        username: 1, 
        name: 1 
    })
    res.json(blogs)
})

blogsRouter.get('/:id', async (req, res, next) => {
    const id = req.params.id
    const blog = await Blog.findById(id)
    blog
    ? res.json(blog)
    : res.status(404).end()
})

const getTokenFrom = req => {
    const authorization = req.get('authorization')
    if (authorization && authorization.startsWith('bearer ')) {
      return authorization.replace('bearer ', '')
    }
    return null
}

blogsRouter.post('/', async (req, res, next) => {
    const body = req.body
    const decodedToken = jwt.verify(getTokenFrom(req), process.env.SECRET)
    if (!decodedToken.id) {
      return res.status(401).json({ error: 'token invalid' })
    }
    //const user = await User.findById(decodedToken.id)    
    const user = req.user
        user
            ? user
            : res.status(401).json({ error: 'token missing' })
        title: body.title
            ? body.title 
            : res.status(400).json({error: 'title missing'})
        url: body.author
            ? body.author
            : res.status(400).json({error: 'url missing'})
        likes: body.likes
            ? body.likes 
            : body.likes = 0

    const blog = new Blog({
        title: body.title,
        author: body.author,
        url: body.author,
        likes: body.likes,
        userId: user._id
    })
    
    const savedBlog = await blog.save()
    user.blogs = user.blogs.concat(savedBlog._id)
    await user.save()
    res.status(201).json(savedBlog)
})

blogsRouter.put("/:id", async (req, res, next) => {
    const { author, title, url, likes } = req.body;
    const id = req.params.id;
    const blog = new Blog({id, author, title, url, likes})
    const savedBlog = await Blog.findByIdAndUpdate(id, blog, {new: true,})
    res.status(200).json(savedBlog)
  });

blogsRouter.delete('/:id', async (req, res, next) => {
    const id = req.params.id
    const user = req.user
    const blog = await Blog.findByIdAndRemove(id)
    res.status(204).end()
})

module.exports = blogsRouter