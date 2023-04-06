const bookModel = require("../model/book");
const { ObjectId } = require("mongoose").Types;
const registerBook = async function (req, res) {
  try {
    const data = req.body;
    const bookData = await bookModel.create(data);
    return res.status(201).send({
      status: true,
      message: "book created succesfullly",
      data: bookData,
    });
  } catch (error) {
    return res.status(400).send({ status: false, message: error.message });
  }
};

// const bookByAuthorId=async function (req,res){
//     try {

//     } catch (error) {
//         return res.status(400).send({status:false,message:error.message});
//     }
// }
const getBook = async function (req, res) {
  try {
   
    const bookData = await bookModel.find();
    return res
      .status(200)
      .send({ status: true, message: "list of all book", data: bookData });
  } catch (error) {
    return res.status(400).send({ status: false, message: error.message });
  }
};
const getBookByName = async function (req, res) {
  try {
    const name = req.query.name;
    const bookData = await bookModel.find({title: name });
    return res
      .status(200)
      .send({ status: true, message: "list of all book", data: bookData });
  } catch (error) {
    return res.status(400).send({ status: false, message: error.message });
  }
};

const singleBook = async function (req, res) {
  try {
    let bookId = req.params.bookId;

    const bookData = await bookModel.findOne({ _id: bookId });
    return res.status(200).send({
      status: true,
      message: " single book data get  sucessfully",
      data: bookData,
    });
  } catch (error) {
    return res.status(400).send({ status: false, message: error.message });
  }
};

const BooksByAuthor = async function (req, res) {
  try {
    let author_Id = req.params.author_Id;
    const bookData = await bookModel.find({
      authorId: new ObjectId(author_Id),
    });
    return res.status(200).send({
      status: true,
      message: " books by author id fetch  sucessfully",
      data: bookData,
    });
  } catch (error) {
    return res.status(400).send({ status: false, message: error.message });
  }
};
const updateBook = async function (req, res) {
  try {
    let bookId = req.params.bookId;
    const data = req.body;
    const { title, authorId, bookCover, description, ISBN, category } = data;
    const bookData = await bookModel.findOneAndUpdate(
      { _id: bookId },
      { $set: { title: title } },
      { new: true }
    );
    return res.status(200).send({
      status: true,
      message: " book updated sucessfully",
      data: bookData,
    });
  } catch (error) {
    return res.status(400).send({ status: false, message: error.message });
  }
};
const deleteBook = async function (req, res) {
  try {
    let bookId = req.params.bookId;
    const bookData = await bookModel.findOneAndDelete({
      _id: bookId,
    });
    return res
      .status(200)
      .send({ status: true, message: " book deleted sucessfully" });
  } catch (error) {
    return res.status(400).send({ status: false, message: error.message });
  }
};

module.exports = {
  registerBook,
  getBook,
  getBookByName,
  singleBook,
  updateBook,
  deleteBook,
  BooksByAuthor,
};
