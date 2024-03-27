const jwt = require('jsonwebtoken')
exports.jwtMiddleware = (req, res, next) => {
    // console.log("inside middleware");
    // token access
    let token = " "
    console.log(req.headers)
    if (req.headers["authorization"]) {
        const header = req.headers["authorization"].split(" ")[1]
    }
    else{
        res.status(401).json("token not found")
    }

    // verify
    try {
        const JWTresponse = jwt.verify(header, 'supersecretkey123')
        //    console.log(JWTresponse);
        req.payload = JWTresponse._id
        //    console.log(req.payload)
        next()

    }
    catch {
        res.status(401).json("autherization failed ! pls login")

    }
}