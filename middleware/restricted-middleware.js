require("dotenv");
const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    const token = req.headers.authorization

    if (token) {
        jwt.verify(token, process.env.JWT_SECRET, (err, decodedToken) => {
            if (err) {
                res.status(401).json({ errorMessage: "There was an error decoding the token!" });
            } else {
                req.decodedJwt = decodedToken;
                console.log(req.decodedJwt);
                next();
            }
        })
    } else {
        res.status(401).json({ errorMessage: "There was an error!" });
    }
}