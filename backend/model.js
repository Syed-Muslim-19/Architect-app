const mongoose = require("mongoose");
const Schema = new mongoose.Schema({
  firstname: String,
  email: String,
  password: String,
  confirmpassword: String,
});
const Collection = new mongoose.model("Register", Schema);
module.exports = Collection;
