const mongoose = require("mongoose");
const { ObjectId } = require("mongoose").Types;
const reviewModel = require("../model/review");

const createReview = async function (req, res) {
  try {
    const data = req.body;
    const { bookId, rating, reviewBy } = data;
    if (!/^[1-5]$/.test(data.rating)) {
      return res.status(400).send({ message: "give rating in between 1 to 5" });
    }
    const reviewData = await reviewModel.create({
      bookId,
      rating,
      reviewBy,
    });
    res.status(201).send({
      status: true,
      message: "review submitted sucessfully",
      data: reviewData,
    });
  } catch (error) {
    return res.status(400).send({ status: false, message: error.message });
  }
};

const updateReview = async function (req, res) {
  try {
    const reviewBookId = req.params.bookId;
    const data = req.body;
    const { bookId, rating, reviewBy } = data;
    if (!/^[1-5]$/.test(data.rating)) {
        return res.status(400).send({ message: "give rating in between 1 to 5" });
      }
    const reviewData = await reviewModel.findOneAndUpdate(
      { _id: reviewBookId },
      { $set: { rating: rating } },
      
      // {$set:{reviewBy:reviewBy}},
      { new: true }
    );
    return res.status(200).send({
      status: true,
      message: "review updated sucessfully",
      data: reviewData,
    });
  } catch (error) {
    return res.status(400).send({ status: false, message: error.message });
  }
};

const deleteReview = async function (req, res) {
  try {
    const reviewId = req.params.reviewId;
    const reviewData = await reviewModel.findOneAndDelete({
      _id: reviewId,
    });
    return res.status(200).send({ message: "review deleted sucessfully" });
  } catch (error) {
    return res.status(400).send({ message: error.message });
  }
};

const fetchReview= async function(req,res){
try {
  const bookReviewId=req.params.bookId;

  const fetchData=await  reviewModel.find({
    bookId: new ObjectId(bookReviewId)
  });
  return res.status(200).send({message:'all reviews of a book is fetched sucessfully',data:fetchData})
  
} catch (error) {
  return res.status(400).send({message:error.message})
}
}

module.exports = { createReview, updateReview, deleteReview,fetchReview };

// /^\w+([\.-]?\w+)@\w+([\.-]?\w+)(\.\w{2,3})+$/.test(email)
// /^[6-9]\d{9}$/.test(mobile)
