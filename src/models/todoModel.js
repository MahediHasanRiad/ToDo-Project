const {Schema, model} = require('mongoose')

const ToDoSchema = Schema({
    UserName: {type: String, default: true},
    ToDoSubject: String,
    ToDoDescription: String,
    ToDoStatus: {type: String, default: 'New'},
    ToDoCreateData: {type: Date},
    ToDoUpdateDate: {type: Date}
}, {versionKey: false})

const ToDoModel = model('todolists', ToDoSchema)

module.exports = ToDoModel