const express = require('express');
const mongoose = require('mongoose');
// const bodyParser = require('body-parser');

const multer  = require('multer')
const upload = multer({ dest: 'uploads/' })

const app = express();

const character = require("./routes/api/character");

// Lokasi config mongodbURI
const db = require("./config/keys").mongoURI;

const path = require('path');

mongoose
    .connect(db)
    .then(() => console.log("mongoDB Connected"))
    .catch((err) => console.log(err));

// Tidak dipakai karena tidak support multipart/form-data
// app.use(bodyParser.urlencoded({ extended: false }));
// app.use(bodyParser.json());

// Tidak dipakai karena tidak support multipart/form-data
// app.use(express.urlencoded({extended: true}));
// app.use(express.json()) // To parse the incoming requests with JSON payloads

// Routes
app.get('/', function (req, res) {
    return res.status(200).json({'message' : 'It Works'});
});

app.post('/', function (req, res) {
    console.log('Isi Body :', req.body);
    return res.status(200).json({'message' : req.body});
});

app.post("/yourpath", upload.single('picture'), (req, res, next) => {

    var postData = req.body;
    //then work with your data

    //or if this doesn't work, for string body
    // var postData = JSON.parse(req.body);

    console.log(postData);
});


app.use(express.static('public'))
app.use('/api/character', character);


const port = process.env.PORT || 5000;

app.listen(port, () => console.log("Server running on port " + port));