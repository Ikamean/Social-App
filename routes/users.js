const express = require('express');
const Account = require('../models/account');


const usersRouter = express.Router();

// get All accounts
usersRouter.get('/', async (req,res) => {
    let accountList = await Account.find({});
    res.json(accountList);
})

usersRouter.get('/:id', async (req,res) => {
    const id = req.params.id;

    const profile = await Account.findOne({ subID : id});

    !profile && res.status(404).send('not found');


    profile && res.json(profile);
})

module.exports = usersRouter;