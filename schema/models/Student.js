const mongoose = require('mongoose')
const Schema = mongoose.Schema

const studentSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    rollNumber: {
        type: String,
        required: true,
    },
    numBottles: {
        type: Number,
        required: true,
    },
    code: {
        type: String,
        required: true
    },
    dateJoined: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('Student', studentSchema)