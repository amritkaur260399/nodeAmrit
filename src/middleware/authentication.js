const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const { ObjectId } = require("mongoose").Types;
const authorModel = require("../model/author");

//router based middleware
const authentication = async function (req, res, next) {
  try {
    
    let token = req.headers.authorization;
    if (!token) {
      return res
        .status(401)
        .send({ message: "you are not login please login" });
    }
    token = token.split(" ");
    // console.log(token)
    //token verify
    jwt.verify(token[1], "secretkey", function (error, decoded) {
      if (error) return res.status(400).send({ message: "token is invalid or expired" });
      else {
        decodedToken = decoded;
      }
      next();
    });
  } catch (error) {
    return res.status(400).send({ status: false, message: error.message });
  }
};

const authorization=async function(req,res,next){
try {
  idFromToken=decodedToken.authorId;

  let loginAuthor=req.params.authorId;
  let checkAuthorId=await authorModel.findById({_id:new ObjectId(loginAuthor)})
  console.log(checkAuthorId)
  if(!checkAuthorId)
  return res.status(404).send({message:"author not found"})
 let authorLogin;
 authorLogin=checkAuthorId.id

 if(idFromToken!==authorLogin){
 return res.status(403).send({message:"authorization failed"})
 }else{
  next();
 }

  
} catch (error) {
  return res.status(400).send({status:false,message:error.message})
}
}

module.exports={authentication,authorization}