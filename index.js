require('dotenv').config();
const cors = require('cors');
const express = require('express');

const loginRouter = require('./routes/login');
const usersRouter = require('./routes/users');
const postRouter = require('./routes/post');

const app = express();
app.use(express.json());
app.use(express.static('build'));
app.use(cors());


app.use('/api/login', loginRouter );
app.use('/api/users', usersRouter );
app.use('/api/post', postRouter);

const PORT = process.env.PORT;


app.get('/', (req,res) => {
    res.send('Hello World');
})


app.listen( PORT,()=>console.log(`Server is running on port ${PORT}`));