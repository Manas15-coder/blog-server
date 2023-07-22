const jwt = require('jsonwebtoken')
const jwtSecret = process.env.JWT_SECRET;

const authMiddleware = (req,res,next)=>{
    const token = req.header('x-auth-token');

    if(!token){
        return res.status(401).json({error:'No token, authorization denied'})
    }
    try{
        const decoded = jwt.verify(token,jwtSecret);
        req.user = decoded;//user data to request object
        next();
    }catch(error){
        return res.status(401).json({error:'Invalid Token'})
    }
}

module.exports = authMiddleware;