const {Schema, model} = require('mongoose')

const dataPetern = Schema({
    firstName: String,
    lastName: String,
    email: String,
    mobile: String,
    city: String,
    userName: {type: String, unique: true},
    password: String
}, {versionKey: false})

const dataModel = model('profiles', dataPetern)

module.exports = dataModel