const express = require('express')
const router  = express.Router()

const postController = require('../controllers/postController')
const authMiddleware = require('../Middleware/authMiddleware')


//create a blog

router.post('/create',authMiddleware,postController.createPost);

//get all blogs

router.get('/all',postController.getAllBlogPosts);
//get single post by id

router.get('/:id',postController.getSinglePost);

//edit blog post

router.put('/:id',authMiddleware,postController.editPost);

//delete a blog post

router.delete('/id',authMiddleware,postController.deletePost)

module.exports = router;