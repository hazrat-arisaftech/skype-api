import jwt from "jsonwebtoken";

const verifyToken = (req, res, next) => {
  const token = req.cookies.accessToken;
  console.log("Test coookies", token);
  if (!token) return res.status(401).json("You are not logged in ");
  jwt.verify(token, "sdjflserjpwo9iasvnlakesrj", (err, user) => {
    if (err) {
      console.log("err ", err);
      return res.status(401).json("Invalid token");
    } else {
      req.user = user;
      next();
    }
  });
};

export default verifyToken;
