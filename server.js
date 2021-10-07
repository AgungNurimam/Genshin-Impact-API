const express = require('express');
const mongoose = require('mongoose');
const app = express();

const character = require("./routes/api/character");

// Lokasi config mongodbURI
const db = require("./config/keys").mongoURI;

// Koneksi ke mongodb
mongoose
    .connect(db)
    .then(() => console.log("mongoDB Connected"))
    .catch((err) => console.log(err));

// dependency multer
const multer = require("multer");
// dependency path untuk menghasilkan jalur tujuan dan nama file secara dinamis
const path = require("path");

// menentukan lokasi pengunggahan
const diskStorage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, "public/uploads"));
    },
    filename: function (req, file, cb) {
        cb(
            null,
            file.fieldname + "-" + Date.now() + path.extname(file.originalname)
        );
    },
});



// Tidak dipakai karena tidak support multipart/form-data
// app.use(bodyParser.urlencoded({ extended: false }));
// app.use(bodyParser.json());

// Tidak dipakai karena tidak support multipart/form-data
// app.use(express.urlencoded({extended: true}));
// app.use(express.json()) // To parse the incoming requests with JSON payloads

// Routes
app.get('/', function (req, res) {
    return res.status(200).json({ 'message': 'It Works' });
});

app.post('/', function (req, res) {
    console.log('Isi Body :', req.body);
    return res.status(200).json({ 'message': req.body });
});

app.post("/yourpath", multer({ storage: diskStorage }).single('picture'), (req, res, next) => {
    const picture = req.file.path;
    console.log(picture);
    if(!picture) {
        res.status(400).send({ 'message': 'tidak ada gambar'});
    }
    // menyimpan lokasi upload data picture pada index yang diinginkan
    // contacts[req.query.index].photo = req.file.path;
    res.send(picture);
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