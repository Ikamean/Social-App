const Post = require('../models/post');

const getAllPosts = async () => {
    const res = await Post.find({});
    return res;
}

module.exports = getAllPosts;