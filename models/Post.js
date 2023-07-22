const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    content: {
        type: String,
        required: true,
    },
    img_url: {
        type: String,
        required: true
    },
    author:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true,
    },
    comments:{
        name:{
            type:String,
            required:false,
        },
        comment:{
            type:String,
            required:false,
        }
    },
    createdAt:{
        type:Date,
        default:Date.now,
    }
});

const Post = mongoose.model('Post',postSchema)

module.exports = Post;