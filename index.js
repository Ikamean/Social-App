require('dotenv').config();
const cors = require('cors');
const express = require('express');
const app = express();
const path = require("path");


const http = require('http');
const socketio = require('socket.io');
const socket = require('./socket');



const server = http.createServer(app);
const io = socketio(server, {
    cors: {
        origins: [ 'https://social-app-bitcamp.herokuapp.com/', 
                    'http://localhost:3000/' 
                ]
    }
});

socket(io);


const loginRouter = require('./routes/login');
const usersRouter = require('./routes/users');
const postRouter = require('./routes/post');




app.use(express.json());
app.use(cors());

app.use('/api/login', loginRouter );
app.use('/api/users', usersRouter );
app.use('/api/post', postRouter);




if( process.env.NODE_ENV === 'production' ) {
    app.use(express.static( path.join ( __dirname, '/Client/build') ));
    
    app.get( '*' , (req, res) => {
        res.sendFile(path.join( __dirname, 'Client', 'build', 'index.html' ));
    })
};

const PORT = process.env.PORT || 5000;


server.listen( PORT,()=>console.log(`Server is running on port ${PORT}`));