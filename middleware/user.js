import jwt from "jsonwebtoken";
import User from "../models/User.js";

export default async function (req, res, next) {
  if (!req.cookies.token) {
    next()
    return
  }

  const decoded = jwt.verify(req.cookies.token, process.env.JWT_KEY)
  const user = await User.findById(decoded.userId)

  req.userId = user._id
  next()
}