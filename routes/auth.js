import { Router } from "express";
import User from "../models/User.js";
import bcrypt from "bcrypt";
import generateAccessToken from "../service/token.js";
import authMiddleware from "../middleware/auth.js"

const router = Router();

router.get("/login", authMiddleware, (req, res) => {
  res.render("login", {
    title: "Login | Sammi",
    isLogin: true,
    loginError: req.flash("loginError"),
  });
});

router.get("/register", authMiddleware, (req, res) => {
  res.render("register", {
    title: "Register",
    isRegister: true,
    registerError: req.flash("registerError"),
  });
});

router.get("/logout", (req, res) => {
  res.clearCookie('token')
  res.redirect("/")
})

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    req.flash("loginError", "All input in required");
    res.redirect("/login");
    return;
  }

  const existUser = await User.findOne({ email });
  if (!existUser) {
    req.flash("loginError", "User is not defined");
    res.redirect("/login");
    return;
  }

  const isPassword = await bcrypt.compare(password, existUser.password);
  if (!isPassword) {
    req.flash("loginError", "Password in invalid!");
    res.redirect("/login");
    return;
  }
  const token = generateAccessToken(existUser._id)
  res.cookie('token', token, { httpOnly: true, secure: true })

  res.redirect("/");
});

router.post("/register", async (req, res) => {
  const { email, password, firstname, lastname } = req.body;

  if (!email || !password || !firstname || !lastname) {
    req.flash("registerError", "All input in required!");
    res.redirect("/register");
    return;
  }

  const existUser = await User.findOne({ email });
  if (existUser) {
    req.flash("registerError", "This user already exists!");
    res.redirect("/register");
    return;
  }

  const hashedPassword = await bcrypt.hash(req.body.password, 10);

  const userData = {
    firstName: req.body.firstname,
    lastName: req.body.lastname,
    email: req.body.email,
    password: hashedPassword,
  };
  const user = await User.create(userData);
  const token = generateAccessToken(user._id)
  res.cookie('token', token, { httpOnly: true, secure: true })

  res.redirect("/");
});

export default router;
