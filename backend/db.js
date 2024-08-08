const mongoose = require("mongoose");
mongoose
  .connect("mongodb://localhost:27017")
  .then(() => {
    console.log("Database Connected");
  })
  .catch((err) => {
    console.log(`Error Occures: ${err}`);
  });
