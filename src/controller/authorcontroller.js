const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt=require("jsonwebtoken")
const authorModel = require("../model/author");
const registerAuthor = async function (req, res) {
  try {
    const data = req.body;
    let { title, name, phoneNumber, email, password, address } = data;
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);
    const authorData = await authorModel.create({
      title,
      name,
      phoneNumber,
      email,
      address,
      password: hashPassword,
    });
    return res
      .status(201)
      .send({
        status: true,
        message: "author created sucessfully",
        data: authorData,
      });
  } catch (error) {
    return res.status(400).send({ status: false, message: error.message });
  }
};

const loginAuthor=async function(req,res){
try {
  const data=req.body;
  const {email,password}=data;
  if(!email){
    return res.status(400).send({message:"email is required"})
  }
  if(!password){
    return res.status(400).send({message:"password is required"})
  }


  const author=await authorModel.findOne({email:email})
  if(!author){
    return res.status(400).send({message:"email is invalid please try again"})
  }

  const verifyPassword=await bcrypt.compare(password,author.password)
  if(!verifyPassword){
    return res.status(400).send({message:"password is invalid please try again"})
  }

  const token=jwt.sign({
    authorId:author._id.toString()
  },"secretkey",{expiresIn:"88h"});

  
// res.setHeader("x-api-key",token);
let object={authorId:author._id, token:token}
res.status(200).send({message:"author login sucessfully",data:object});



} catch (error) {
  return res.status(400).send({ status: false, message: error.message });
}
}

const getAuthor = async function (req, res) {
  try {
   
    const authorData = await authorModel.find();
    return res
      .status(200)
      .send({ status: true, message: "list of all author", data: authorData });
  } catch (error) {
    return res.status(400).send({ status: false, message: error.message });
  }
};
const getAuthorByName = async function (req, res) {
  try {
    const name = req.query.name;
    const authorData = await authorModel.find({ name });
    return res
      .status(200)
      .send({ status: true, message: "linfo of author", data: authorData });
  } catch (error) {
    return res.status(400).send({ status: false, message: error.message });
  }
};
const singleAuthor = async function (req, res) {
  try {
    let authorId = req.params.authorId;

    const authorData = await authorModel.findOne({ _id: authorId });
    return res
      .status(200)
      .send({
        status: true,
        message: " single author data get  sucessfully",
        data: authorData,
      });
  } catch (error) {
    return res.status(400).send({ status: false, message: error.message });
  }
};
const updateAuthor = async function (req, res) {
  try {
    let authorId = req.params.authorId;
    const data = req.body;
    const { title, name, phoneNumber, email, password, address } = data;
    const authorData = await authorModel.findOneAndUpdate(
      { _id: authorId },
      { $set: { name: name, title: title, phoneNumber: phoneNumber } },
      { new: true }
    );
    return res
      .status(200)
      .send({
        status: true,
        message: " author updated sucessfully",
        data: authorData,
      });
  } catch (error) {
    return res.status(400).send({ status: false, message: error.message });
  }
};
const deleteAuthor = async function (req, res) {
  try {
    let authorId = req.params.authorId;
    const authorData = await authorModel.findOneAndDelete({
      _id: authorId,
    });
    return res
      .status(200)
      .send({ status: true, message: " author deleted sucessfully" });
  } catch (error) {
    return res.status(400).send({ status: false, message: error.message });
  }
};

module.exports = {
  registerAuthor,
  getAuthor,
  getAuthorByName,
  updateAuthor,
  deleteAuthor,
  singleAuthor,
  loginAuthor
};

//if we want to export with other name
// module.exports.registerAuthor=amritauthor;

//if one then no need of curlybraces in case of two we need



