const { removePost, addPost, addPostComment } = require('./utils/postsHandler');
const { addUser, removeUser} = require('./utils/usersHandler');


module.exports = (io) => io.on('connect', (socket) => {
    
    socket.on('join', ({ subID }) => {
        let loggedUsers = addUser(subID);
        io.emit('online', { onlineUsers : loggedUsers });
    });

    socket.on('logout', ({ subID, users }) => {
        let onlineUsers = removeUser(subID, users);
        //console.log(onlineUsers);
        io.emit('userLoggedOut', { onlineUsers : onlineUsers });
    })

    socket.on('createPost', async ({ postMessage, sub, picture, name }, callback) => {
        let newPost = await addPost({ postMessage,sub,picture,name });
        
        
        await io.emit('newPost', { newPost : newPost });

        callback();
    })

    socket.on('removePost', async ({ id, authorId }) => {
        
        let removedPostId = await removePost({ id, authorId });

        
        io.emit('removedPostId', { removedPostId : removedPostId });

    });

    socket.on('postComment', async ( {id, comment, sub, picture, name}) => {
        let updatedPost = await addPostComment({ id, comment, sub, picture, name });

        io.emit('updatedPostWithComments', { post : updatedPost })
    })

    socket.on('disconnect', () => {
        
    });

});