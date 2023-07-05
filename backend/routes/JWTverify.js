const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();

//Middleware to authenticate requests:

const authenticateToken = (req, res, next) =>{
    const token = req.headers.authorization?.split(' ')[1];
    if(!token){
        return res.status(401).json({message: 'No token provided'});
    }

    jwt.verify(token, 'askdjfsd223423sdfsd334', (err, decoded)=>{
        if(err){
            return res.status(403).json({message: 'invalid token'});
        }
        req.user=decoded;
        next();
    });
};

router.get('/', authenticateToken, (req,res)=>{
    const {username} = req.user;
    res.json({username});
})

module.exports = router;