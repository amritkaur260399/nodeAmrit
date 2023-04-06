const express=require("express");
const router=express.Router()
const authorController = require("../controller/authorController");
const bookController=require("../controller/bookController")
const reviewController=require("../controller/reviewController")
const middleware=require("../middleware/authentication")


// author router
router.post("/register", authorController.registerAuthor)
router.post("/login", authorController.loginAuthor)
router.get("/author",authorController.getAuthor)
router.get("/authorByName",authorController.getAuthorByName)
router.get("/singleAuthor/:authorId",authorController.singleAuthor)
router.put("/updateAuthor/:authorId",middleware.authentication,middleware.authorization,authorController.updateAuthor)
router.delete("/deleteAuthor/:authorId",middleware.authentication,middleware.authorization,authorController.deleteAuthor)


//book router
router.post("/book",middleware.authentication, bookController.registerBook)
router.get("/getbook",middleware.authentication,  bookController.getBook)
router.get("/getBookByName", bookController.getBookByName)
router.get("/singleBook/:bookId", bookController.singleBook)
router.put("/updateBook/:bookId",middleware.authentication,middleware.authorization, bookController.updateBook)
router.delete("/deleteBook/:bookId",middleware.authentication,middleware.authorization, bookController.deleteBook)
router.get("/booksByAuthor/:author_Id",middleware.authentication, bookController.BooksByAuthor)

//review router
router.post("/review",reviewController.createReview)
router.put("/updateReview/:bookId",reviewController.updateReview)
router.delete("/deleteReview/:reviewId",reviewController.deleteReview)
router.get("/fetchReview/:bookId",reviewController.fetchReview)



module.exports=router;