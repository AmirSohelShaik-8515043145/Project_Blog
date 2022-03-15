const jwt = require("jsonwebtoken");

const authentication = function (req, res, next) {
    try {
        let token = req.headers["x-Api-Key"];
        if (!token) token = req.headers["x-api-key"];

        if (!token) return res.send({ status: false, msg: "token must be present." });
        let decodedToken = jwt.verify(token, "Secret-Key");
        //   console.log(decodedToken);
        if (!decodedToken)
            return res.status(404).send({ status: false, msg: "token is invalid." });
        next();
    }
    catch (error) {
        res.status(500).send({ status: false, msg: error.message });
    }
}


const authorisation = function (req, res, next) {
    let token = req.headers["x-Api-Key"];
    if (!token) token = req.headers["x-api-key"];

    if (!token) return res.send({ status: false, msg: "token must be present." });
    let decodedToken = jwt.verify(token, "Secret-Key");
    // console.log(decodedToken);

    if (!decodedToken || decodedToken.authorId != req.query.authorId) {
        // console.log(decodedToken.authorId)
        // console.log(req.query.authorId)
        return res.status(404).send({ status: false, msg: "token is invalid." });
    }
    next();
}

module.exports.authentication = authentication;
module.exports.authorisation = authorisation;