const dataModel = require("../models/userProfileModel")
const jwt = require('jsonwebtoken')

exports.createProfile = (req, res)=> {
    const reqBody = req.body 
    dataModel.create(reqBody, (err, data) => {
        if(err){
            res.status(404).json({massage: err})
        }else{
            res.status(200).json({massage: data})
        }
    })
}

exports.logInProfile = (req, res) => {
    let userN = req.body['userName']
    let pass = req.body['password']

    dataModel.find({userName: userN, password: pass}, (err, data)=> {
        if(data.length > 0){
                
            let payload = {                 // jwt encode
                data: data
            }
            const tokenKey = jwt.sign(payload, 'riad')

            res.status(200).json({massage: data, tokenKey})
        }else{
            res.status(404).json({massage: err})
        }
    })
}

exports.selectProfile = (req, res) => {
    const query = req.headers.userName
    // console.log(query)

    dataModel.find({userName: query}, (err, data) => {
        if(err){
                res.status(404).json({status: 'fail',massage: err})
            }else{
                res.status(200).json({status: 'success',massage: data})
            }
    })
}


exports.updateProfile = (req, res) => {
    let query = req.headers.userName
    let update = req.body
    console.log(query)

    dataModel.updateOne({userName: query}, {$set: update}, (err, data) => {
        if(err){
            res.status(404).json({status: 'fail', massage: err})
        }else{
            res.status(200).json({status: 'success',massage: data})
        }
    })
}