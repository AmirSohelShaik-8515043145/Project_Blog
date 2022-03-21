const AuthorModel = require("../models/authorModel")


const isValid = function (value) {
    if (typeof (value) === undefined || typeof (value) === null) { return false }
    if (typeof (value).trim().length == 0) { return false }
    if (typeof (value) === "string" && (value).trim().length > 0) { return true }
}

const createAuthor = async function (req, res) {
    try {
        let data = req.body
        if (Object.keys(data) == 0) return res.status(400).send({ status: false, msg: "BAD REQUEST NO DATA PROVIDED" })
        const { fname, lname, title, email, password } = data

        if (!isValid(fname)) { return res.status(400).send({ status: false, msg: "First name is required" }) }
        if (!isValid(lname)) { return res.status(400).send({ status: false, msg: "Last name is required" }) }
        if (!isValid(title)) { return res.status(400).send({ status: false, msg: "Title is required" }) }
        if (!isValid(email)) { return res.status(400).semd({ status: false, msg: "Email is required" }) }
        if (!isValid(password)) { return res.status(400).send({ status: false, msg: "Password is required" }) }
        let savedData = await AuthorModel.create(data)
        return res.status(201).send({ msg: savedData })
    }
    catch (error) {
        console.log(error)
        return res.status(500).send({ msg: error.message })


    }
}





module.exports.createAuthor = createAuthor
