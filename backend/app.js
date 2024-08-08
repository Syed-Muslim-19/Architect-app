const express = require("express");
const app = express();
const path = require("path");
const Connect = require("./db");
const Collection = require("./model");
const { Connection } = require("mongoose");

const PATH = path.join(__dirname, "../frontend");
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(PATH));
app.get("/", (req, res) => {
  res.sendFile(path.join(PATH, "login.html"));
});
app.get("/registration", (req, res) => {
  res.sendFile(path.join(PATH, "registration.html"));
});
app.post("/registration", async (req, res) => {
  const pass1 = req.body.password;
  const pass2 = req.body.confirmpassword;
  if (pass1 === pass2) {
    const reg = new Collection({
      firstname: req.body.firstname,
      email: req.body.email,
      password: req.body.password,
      confirmpassword: req.body.confirmpassword,
    });
    const data = await reg.save();
    res.sendFile(path.join(PATH, "login.html"));
  } else {
    res.send("Password not Matching");
  }
});
app.post("/", async (req, res) => {
  const mail = req.body.email;
  const pass = req.body.password;
  try {
    const data = await Collection.findOne({ email: mail, password: pass });
    if (!data) {
      res.send("Not Registered");
    } else {
      res.sendFile(path.join(PATH, "sample.html"));
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, "127.0.0.1", () => {
  console.log(`Connecting on port ${PORT}...`);
});
