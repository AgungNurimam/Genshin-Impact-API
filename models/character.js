const mongoose = require('mongoose');
const schema = mongoose.Schema;

// const UserSchema = new schema({
//     name:{
//         type:String,
//         required:true
//     },
//     email:{
//         type:String,
//         required:true
//     },
//     password:{
//         type:String,
//         required:true
//     },
//     created_at:{
//         type:Date,
//         default:Date.now
//     }
// });

// module.exports = User = mongoose.model("user",UserSchema);


const CharacterSchema = new schema({
    name: {
        type: String,
        required: true
    },
    element: {
        type: String,
        required: true
    },
    region: {
        type: String,
        required: true
    },
    gender: {
        type: String,
        required: true
    }
    // birthday: {
    //     type: Date,
    //     required: true
    // }
});

module.exports = Character = mongoose.model("character", CharacterSchema);