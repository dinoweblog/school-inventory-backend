const express = require("express");

const { register, login, profile } = require("./controllers/auth.controller");
const teacherController = require("./controllers/teacher.controller");
const { classes } = require("./controllers/class.controller");

const app = express();

app.use(express.json());

app.use(express.static("public"));

app.post("/register", register);
app.post("/login", login);
app.get("/user/:id", profile);

app.use("/teachers", teacherController);
app.use("/classes", classes);

module.exports = app;
