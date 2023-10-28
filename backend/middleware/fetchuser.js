var jwt = require('jsonwebtoken');
const JWT_secret = "harryisagoodb$oy"

const fetchuser = ( req, res, next)=>{
    const token = req.header('auth-token');
    if(!token){
        return res.status(400).json({error: 'please authenticate with a valid token'})
    }
    try {
        let data = jwt.verify(token, JWT_secret)
        req.user = data.user
        next()
    } catch (error) {
        res.status(401).send({ error: "Please authenticate using a valid token" })
    }
}

module.exports = fetchuser;