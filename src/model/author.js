const mongoose=require("mongoose")

const authorSchema=new mongoose.Schema({
    title:{
        type:String,
        required:true,
        trim:true,
        enum:["Mr", "Mrs", "Miss"],

    },
    name:{
        type:String,
        required:true,
        trim:true,
    },
   phoneNumber:{
        type:Number,
        required:true,
        trim:true,
        unique:true,
    },
    email:{
        type:String,
        lowercase:true,
        required:true,
        trim:true,
        unique:true,
    },
    password:{
        type:String,
        required:true,
        trim:true,
    },
    address:{
        type:String,
        trim:true,
    },
},
    {timestamps:true},
);

module.exports=mongoose.model("author",authorSchema);

//model is a rapper around a schema it provide interface in database to perfornm crud operations
//module is a set of functions 
//authenication  it will check our crendials login or password status code 401
//authorization valid author id status code 403 checks author is valid or not