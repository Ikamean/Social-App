require('dotenv').config();
const cors = require('cors');
const express = require('express');
const app = express();

const http = require('http').Server(app);
const io = require('socket.io')(http, {
    cors: {
        origins: ['http://localhost:3000']
    }
});

const loginRouter = require('./routes/login');
const usersRouter = require('./routes/users');
const postRouter = require('./routes/post');


const getAllPosts = require('./utils/postsHandler');

app.use(express.json());
app.use(express.static('build'));
app.use(cors());


app.use('/api/login', loginRouter );
app.use('/api/users', usersRouter );
app.use('/api/post', postRouter);

const PORT = process.env.PORT || 5000;

io.on('connect', (socket) => {
    console.log('a user connected');
    
    socket.on('join', ( { name, loggedUserSubID } ) => {

        io.emit('online', { userName: name, userSubId : loggedUserSubID })
    });

    socket.on('disconnect', () => {
        console.log('user disconnected');
    });

});



app.get('/', (req,res) => {
    res.send('Hello World');
})


http.listen( PORT,()=>console.log(`Server is running on port ${PORT}`));