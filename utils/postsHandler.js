const Post = require('../models/post');
const Account = require('../models/account');

const getAllPosts = async () => {
    const res = await Post.find({});
    return res;
}

const removePost = async ({ id }) => {
    await Post.findOneAndDelete({ _id: id });

    let postsArray = await Post.find({});
    

    return postsArray;
}

module.exports = { getAllPosts, removePost }