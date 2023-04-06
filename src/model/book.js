const mongoose = require("mongoose");
const ObjectId = mongoose.Schema.Types.ObjectId;
const bookSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      unique: true,
    },
    authorId: {
      type: ObjectId,
      required: true,
      reference: "author",
    },
    bookCover: {
      type: String,
      unique: true,
    },
    description: {
      type: String,
      required: true,
    },
    ISBN: {
      type: String,
      required: true,
      unique: true,
    },
    category: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);


module.exports=mongoose.model("book",bookSchema)