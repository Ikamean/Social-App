const express = require('express');
const Post = require('../models/post');
const Account = require('../models/account');



const postRouter = express.Router();

postRouter.post('/likes/:id', async ( req,res ) => {
    const body = req.body;
    const id = req.params.id;


    // Adding Liked Post To user  
    let likeAuthor = await Account.findOne( 
        { subID : body.loggedUserId })
        .catch( error => {
            res.send(500)
            console.error(error);
        });
    

    let allreadyAdded = likeAuthor.likedPosts.some( postId => postId === id );

    let updatedLikedPostsArray = [];

    if( !allreadyAdded ) updatedLikedPostsArray = likeAuthor.likedPosts.concat(id);

    if( allreadyAdded ) updatedLikedPostsArray = likeAuthor.likedPosts.filter( p => p !== id && p);

    
    

    let updatedUserLikes = await Account.findOneAndUpdate( 
        { subID : body.loggedUserId }, 
        { likedPosts : updatedLikedPostsArray },
        { new: true }
        ).catch( error => {
            res.send(500)
            console.error(error);
        });
    ///////////////////////////////////////////////////
    
    //// updating Post Like Value

    let post = await Post.findOne({ _id : id });

    let updatedlikes = allreadyAdded ? post.likes -1 : post.likes +1

    let newPost = await Post.findOneAndUpdate( 
        { _id : id }, 
        { likes : updatedlikes }, 
        { new: true } )
        .catch( error => {
            res.send(500)
            console.error(error);
        });

    const sendResponse = {
        likedPost: newPost,
        user : updatedUserLikes,
        liked: !allreadyAdded
    };

    res.json(sendResponse);


});

const randomID = () => '_' + Math.random().toString(36).substr(2, 9);

postRouter.post('/comments/:id' , async ( req, res ) => {
    const id = req.params.id;
    const body = req.body;

    const post = await Post.findOne( { _id : id }).catch( err => console.error(err));


    const postComment = {
        content: body.comment,
        id: randomID(),
        authorId: body.loggedUserId,
        authorPicture: body.loggedUserPicture,
        authorName: body.loggedUserName,
        createdTime: Date()
    }

    let commentsArray = post.comments.concat(postComment);
    
    let updatedComments = await Post.findOneAndUpdate( 
        { _id : id }, 
        { comments : commentsArray }, 
        { new : true })
        .catch( err => console.error(err) );    

    
    res.json(updatedComments)

})

postRouter.post('/', async ( req,res ) => {

    const body = req.body;

    const newPost = new Post({
        content: body.content,
        creationDate: new Date(),
        authorId: body.authorId,
        authorPicture: body.authorPicture,
        authorName: body.authorName,
        comments: [],
        likes : 0
    });

    let postAuthor = await Account.findOne({ subID : body.authorId });
    

    postAuthor.posts.push(newPost);


    let allAuthors = await Account.find({});

    allAuthors = allAuthors.map( a =>{
        a.subID === postAuthor.subID ? a = postAuthor : a = a
    });
    
    await newPost.save();
    await postAuthor.save();
    
    res.status(200).json(newPost);
});

postRouter.get('/', async (req,res) => {
    let postList = await Post.find({});

    res.json(postList);
});

postRouter.get('/:id', async ( req, res ) => {
    const postId = req.params.id;

    const loggedUserId = req.query.loggedUserId;

    let user =  await Account.findOne( { subID : loggedUserId } );

    const allreadyLiked = user.likedPosts.some( id => id === postId );


    res.json(allreadyLiked)
})

postRouter.delete('/', async ( req,res ) => {
    const body = req.body;
    const postId = body.id;
    const authorId = body.authorId

    let deletion = await Post.findOneAndDelete({ _id: postId });
    
    let author = await Account.findOne( { subID : authorId } );
   
    let updatedPosts = author.posts.filter( post =>  post._id.toString() !== postId );

    let updatedAuthorPosts = await Account.findOneAndUpdate( 
        { subID : authorId }, 
        { posts : updatedPosts }, 
        { new: true });
    
    res.json(updatedAuthorPosts);
    
})


module.exports = postRouter;