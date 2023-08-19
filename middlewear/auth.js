var jwt = require('jsonwebtoken');


const auth = (req,res,next)=>{
    const token = req.headers.authorization?.split(' ')[1];

    if(token){
    try{
        const decoded = jwt.verify(token,'masai');

        if(decoded){
            req.body.userID = decoded.userId;
            req.body.user = decoded.user;
            next()
        } else{
            res.status(200).json({msg:'user is not authorization!!!'})
        }

    } catch(err){
        res.status(400).json({error:err.massage})
    }
    }
    else{
        res.status(200).json({msg:'please login!!!'})
    }
}

module.exports = {auth};