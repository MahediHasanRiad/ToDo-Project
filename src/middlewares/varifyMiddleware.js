const jwt = require('jsonwebtoken')

module.exports = (req, res, next) => {
    const key = req.headers['token']
    jwt.verify(key, 'riad', (err, decoded)=> {          // jwt decode
        if(err){
            res.status(404).json({massage: err})
        }else{
            let user = decoded['data']['0']['userName']
            req.headers.userName = user
          
            next()
        }
    })
}