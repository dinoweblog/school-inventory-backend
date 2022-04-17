const express = require("express");

const passport = require("./configs/passport");

const { register, login, profile } = require("./controllers/auth.controller");
const teacherController = require("./controllers/teacher.controller");

const app = express();

app.use(express.json());

// use the express-static middleware
app.use(express.static("public"));

app.post("/register", register);
app.post("/login", login);
app.get("/user/:id", profile);

// app.use(passport.initialize());

// passport.serializeUser(function (user, callback) {
//   callback(null, user);
// });

// passport.deserializeUser(function (user, callback) {
//   callback(null, user);
// });

// app.get(
//   "/auth/google",
//   passport.authenticate("google", { scope: ["email", "profile"] })
// );

// app.get(
//   "/auth/google/callback",
//   passport.authenticate("google", {
//     failureRedirect: "/auth/google/failure",
//   }),
//   (req, res) => {
//     return res.status(201).json({ user: req.user.user, token: req.user.token });
//   }
// );

// app.get("/auth/google/failure", (req, res) => {
//   return res.send("Failure");
// });

app.use("/teachers", teacherController);

module.exports = app;
