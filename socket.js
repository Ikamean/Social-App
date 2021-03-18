const { removePost } = require('./utils/postsHandler');


module.exports = (io) => io.on('connect', (socket) => {
    
    socket.on('join', ( callback ) => {

        
        //io.emit('online');

        callback();
    });

    socket.on('createPost', (res, callback) => {
        
        io.emit('newPost', { newPost : res });

        callback();
    })

    socket.on('removePost', async ( id ) => {
        let updatedPosts = await removePost(id);

        io.emit('updatePostsAfterRemovingOne', { posts : updatedPosts });

    });

    socket.on('postComment', ( updatedPostWithComments, callback ) => {

        socket.emit('updatedPostWithComments', { post : updatedPostWithComments })

        callback();
    })

    socket.on('disconnect', () => {
       // console.log('user disconnected');
    });

});