const routers = require('express').Router()
const verifyProfile = require('../middlewares/varifyMiddleware.js')
const {
     createProfile,
     logInProfile,
     selectProfile,
     updateProfile,
    } = require('../controllers/profileController')

const {
    createTodo,
    showToDoList,
    updateToDoList,
    deleteToDoList,
    statusUpdate,
    filterByteStatus,
    filterByDate
} = require('../controllers/todoController')

// profile Routers
routers.post('/registration', createProfile)
routers.post('/login', logInProfile)
routers.get('/showProfile', verifyProfile, selectProfile)
routers.post('/updateProfile', verifyProfile, updateProfile)

// ToDo routers
routers.post('/createToDo', verifyProfile, createTodo)
routers.get('/showToDoList', verifyProfile, showToDoList)
routers.post('/updateToDoList', verifyProfile, updateToDoList)
routers.get('/deleteToDoList', verifyProfile, deleteToDoList)
routers.post('/updateStatus', verifyProfile, statusUpdate)
routers.get('/filterByteStatus', verifyProfile, filterByteStatus)
routers.get('/filterByDate', verifyProfile, filterByDate)



module.exports = routers