const express = require("express");
const route = require("./routes/route");
const mongoose = require("mongoose");
const app = express();

//parse data json form to body
app.use(express.json());

mongoose
  .connect(
    "mongodb+srv://amritkaur19:amritkaurchahal@saab.o0wa7jn.mongodb.net/?retryWrites=true&w=majority",
    //bugs ignore and connect database bugs comes when url getting old
    { useNewUrlParser: true }
  )
  .then(() => console.log("mongodb connected"))
  .catch((err) => console.log(err, "error"));

//route k end point match kra re
app.use("/", route);

//GLOBAL MIDDDLEWARE
route.all("/*", function (req, res) {
  res.status(404).send({ message: " URL NOT FOUND!" });
});

app.listen(process.env.PORT || 6000, function () {
  console.log("express app running on port  " + (process.env.PORT || 6000));
});
