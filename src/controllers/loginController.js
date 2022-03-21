const AuthorModel = require("../models/authorModel")
const jwt = require("jsonwebtoken")

const isValid = function (value) {
    if (typeof (value) === undefined || typeof (value) === null) { return false }
    if (typeof (value).trim().length == 0) { return false }
    if (typeof (value) === "string" && (value).trim().length > 0) { return true }
}

const login = async function (req, res) {
    try {
        const mail = req.body.email
        const pass = req.body.password
        const data = req.body
        if (Object.keys(data) == 0) return res.status(400).send({ status: false, msg: "No input provided" })
        if (!isValid(mail)) { return res.status(400).send({ status: false, msg: "Email is required" }) }
        if (!isValid(pass)) { return res.status(400).send({ status: false, msg: "Password is required" }) }

        const userMatch = await AuthorModel.findOne({ email: mail, password: pass })
        if (!userMatch) return res.status(400).send({ status: false, msg: "Email or Password is incorrect" })

        const token = jwt.sign({
            userId: userMatch._id.toString(),
            batch:"thorium",
            projectDoneBy:"Amir Sohel Shaik",
            groupNo:"12",
        }, "Secret-Key")

        res.setHeader("x-api-key", "token");
        return res.status(200).send({ status: true, msg: "You are successfully logged in", token })

    }
    catch (error) {
        console.log(error)
        return res.status(500).send({ msg: error.message })
    }
}

module.exports.login = login