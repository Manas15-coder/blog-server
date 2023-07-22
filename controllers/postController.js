const Post = require('../models/Post')



//create a blog

const createPost = async (req, res) => {
    const { title, content, img_url, comments } = req.body;
    const author = req.user.id;//logged in user's ID from middleware

    try {
        const post = new Post({ title, content, img_url, comments, author });
        await post.save();
        return res.status({ message: 'Blog Post created successfully', post });
    } catch (error) {
        console.error('Error creating blog post', error)
    }
};

//get all blog posts

const getAllBlogPosts = async (req, res) => {
    try {
        const posts = await Post.find().populate('author', 'username')
        return res.status(201).json(posts);
    } catch (error) {
        console.error('Error getting blog posts', error)
        return res.status(501).json({ error: 'Error getting blog posts' })
    }
};

//get blog post by id

const getSinglePost = async (req, res) => {
    const postId = req.params.id;
    try {
        const post = await Post.findById(postId);
        if (!post) {
            return res.status(401).json({ error: 'Blog post not found' });
        }

        return res.status(201).json(post);
    } catch (error) {
        console.error('Error getting blog posts', error)
        return res.status(500).json({ error: 'Error getting blog posts' })
    }
};

//edit post
const editPost = async (req, res) => {
    const postId = req.params.id;
    const { title, content, img_url, comments } = req.body;
    try {
        const post = await Post.findById(postId);
        if (!post) {
            return res.status(401).json({ error: 'Blog post not found' });
        }
        //check whether logged-in user is author of post

        if (post.author.toString() !== req.user.id) {
            return res.status(401).json({ error: 'Not authorized to edit the post' })
        }
        //update
        post.title = title;
        post.content = content;
        post.img_url = img_url;
        post.comments = comments;
        await post.save();

        res.status(200).json({ message: 'Blog post edited successfully', post })
    } catch (error) {
        console.error('Error editing blog post:', error);
        res.status(500).json({ error: 'Error editing blog post' })
    }
};
//delete blog post by id

const deletePost = async (req, res) => {
    const postId = req.params.id;
    try {
        const post = await Post.findById(postId);
        if (!post) {
            return res.status(404).json({ error: 'Blog Post not found' })
        }

        if (post.author.toString() !== req.user.id) {
            return res.status(401).json({ error: 'Not authorized to delete this post' })
        }
        await post.remove();
        return res.status(201).json({ message: 'Blog Post Deleted Succesfully' })
    } catch (error) {
        console.error('Error deleting blog post', error);
        res.status(500).json({ error: 'Error deleted successfully' })
    }
};

module.exports = { createPost, getAllBlogPosts, getSinglePost, editPost, deletePost };