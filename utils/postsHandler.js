const Post = require('../models/post');
const Account = require('../models/account');

const randomID = () => '_' + Math.random().toString(36).substr(2, 9);

const getAllPosts = async () => {
    const res = await Post.find({});
    return res;
}

const addPost = async ({ postMessage, sub, picture, name}) =>{

    const newPost = new Post({
        content: postMessage,
        creationDate: new Date(),
        authorId: sub,
        authorPicture: picture,
        authorName: name,
        comments: [],
        likes : 0
    });

    let postAuthor = await Account.findOne({ subID : sub });
    

    postAuthor.posts.push(newPost);


    let allAuthors = await Account.find({});

    allAuthors = allAuthors.map( a =>{
        a.subID === postAuthor.subID ? a = postAuthor : a = a
    });
    
    await newPost.save();
    await postAuthor.save();

    return newPost;
}

const removePost = async ({ id, authorId }) => {
    
    await Post.findOneAndDelete({ _id: id });
    
    let author = await Account.findOne( { subID : authorId } );
   
    let updatedPosts = author.posts.filter( post =>  post._id.toString() !== id );

    await Account.findOneAndUpdate( 
        { subID : authorId }, 
        { posts : updatedPosts }, 
        { new: true });
    
    return id;
}

const addPostComment = async ({ id, comment, sub, picture, name }) => {
    
    const post = await Post.findOne( { _id : id }).catch( err => console.error(err));

    const postComment = {
        content: comment,
        id: randomID(),
        authorId: sub,
        authorPicture: picture,
        authorName: name,
        createdTime: Date()
    }

    let commentsArray = post.comments.concat(postComment);
    
    let updatedPost = await Post.findOneAndUpdate( 
        { _id : id }, 
        { comments : commentsArray }, 
        { new : true })
        .catch( err => console.error(err) );
        
    return updatedPost;

}

module.exports = { getAllPosts, removePost, addPost, addPostComment }