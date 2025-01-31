import jwt from "jsonwebtoken";

const generateAccessToken = (userId) => {
  const accessToken = jwt.sign({ userId }, process.env.JWT_KEY, { expiresIn: "30d" });

  return accessToken
};

export default generateAccessToken