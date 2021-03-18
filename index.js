require('dotenv').config();
const cors = require('cors');
const express = require('express');
const app = express();

const path = require("path");

const http = require('http').Server(app);
const io = require('socket.io')(http, {
    cors: {
        origins: ['http://localhost:3000']
    }
});

const loginRouter = require('./routes/login');
const usersRouter = require('./routes/users');
const postRouter = require('./routes/post');



const { removePost } = require('./utils/postsHandler');

app.use(express.static('build'));
app.use(express.json());
app.use(cors());


app.use('/api/login', loginRouter );
app.use('/api/users', usersRouter );
app.use('/api/post', postRouter);

const PORT = process.env.PORT || 5000;

io.on('connect', (socket) => {
    
    socket.on('join', ( { name, loggedUserSubID } ) => {

        io.emit('online', { userName: name, userSubId : loggedUserSubID })
    });

    socket.on('createPost', (res, callback) => {
        console.log(res);
        
        io.emit('newPost', { newPost : res });

        callback();
    })

    socket.on('removePost', async ( id ) => {
        let updatedPosts = await removePost(id);

        io.emit('updatePostsAfterRemovingOne', { posts : updatedPosts });

    });

    socket.on('postComment', ( updatedPostWithComments, callback ) => {
        console.log(updatedPostWithComments);

        socket.emit('updatedPostWithComments', { post : updatedPostWithComments })

        callback();
    })

    socket.on('disconnect', () => {
       // console.log('user disconnected');
    });

});








http.listen( PORT,()=>console.log(`Server is running on port ${PORT}`));