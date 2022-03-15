const AuthorModel = require("../models/authorModel")
const jwt = require("jsonwebtoken")


const createAuthor = async function (req, res) {
    try {
        let data = req.body
        if (Object.keys(data) == 0) return res.status(400).send({ status: false, msg: "BAD REQUEST NO DATA PROVIDED" })
        let savedData = await AuthorModel.create(data)
        res.status(201).send({ msg: savedData })
    }
    catch (error) {
        console.log(error)
        res.status(500).send({ msg: error.message })
    }
}


const loginUser = async function (req, res) {
    try{
    let userName = req.body.emailId;
    let password = req.body.password;
  
    let author = await AuthorModel.findOne({ emailId: userName, password: password });
    if (!author)
      return res.staus(400).send({
        status: false,
        msg: "username or the password is not corerct",
      });
  
    let token = jwt.sign(
      {
        authorId: author._id.toString(),
        batch: "thorium",
        organisation: "FUnctionUp",
      },
      "Secret-Key"
    );
    res.setHeader("x-api-key", token);
    res.status(200).send({ status: true, data: token });
  }
  catch (error) {
        console.log(error)
        res.status(500).send({ msg: error.message })
    }
}


module.exports.createAuthor = createAuthor
module.exports.loginUser = loginUser