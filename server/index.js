const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const UserModel = require('./models/Users');

const app = express();
app.use(cors());
app.use(express.json());


const port = 3001;
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
});



mongoose.connect('mongodb+srv://shapovala:k0GWNXZeZBuehfzd@mernstuding.sxamk.mongodb.net/crud?retryWrites=true&w=majority&appName=mernStuding');





app.get('/', (req, res) => {
    UserModel.find({}).then(function(users) {
        res.json(users);
    }).catch(function(err) {
        res.json(err);
    });
});

app.get('/getUser/:id', (req, res) => {
    const id = req.params.id;
    UserModel.findById({_id:id}).then(function(users) {
        res.json(users);
    }).catch(function(err) {
        res.json(err);
    });
});

app.put('/updateUser/:id', (req, res) => {
    const id = req.params.id;
    UserModel.findByIdAndUpdate({_id:id}, {
        name: req.body.name, 
        email: req.body.email, 
        age: req.body.age}
    ).then(function(users) {
        res.json(users);
    }).catch(function(err) {
        res.json(err);
    });
});

app.delete('/deleteUser/:id', (req, res) => {
    const id = req.params.id;
    UserModel.findByIdAndDelete({_id:id}).then(function(users) {
        res.json(users);
    }).catch(function(err) {
        res.json(err);
    });
});


app.post('/createUser', async (req, res) => {
    UserModel.create(req.body)
    .then(users => res.json(users))
    .catch(err => res.json(err))
});