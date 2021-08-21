const express = require('express');
const router = express.Router();

const Character = require('../../models/Character');


router.post("/create", (req, res) => {
    console.log('Isi Body :', req.body);
    Character.findOne({ name: req.body.name })
        .then(character => {
            if (character) {
                return res.status(400).json({ 'message': 'Karater sudah ada' });
            } else {

                const newCharacter = new Character({
                    name: req.body.name,
                    element: req.body.element,
                    region: req.body.region,
                    gender: req.body.gender,
                    // birthday: req.body.birthday
                });

                newCharacter.save()
                    .then(character => res.json({ 'message': 'Karakter berhasil disimpan' }))
                    .catch(err => console.log(err))
                // return res.json(newCharacter);
            }
        })
});

module.exports = router;