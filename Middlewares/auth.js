const jwt = require("jsonwebtoken");
const acces_data_secret_key = process.env.LOGIN_SECRET_KEY;
const verifyToken = (req, res, next) => {
  const token = req.headers["token"];
  if (!token) {
    return res
      .status(403)
      .send({ message: "A token is required for authentication" });
  }
  try {
    const decoded = jwt.verify(token, acces_data_secret_key);
    req.user = decoded;
    console.log(req.user);
  } catch (err) {
    return res.status(401).send({ message: "Invalid Token" });
  }
  return next();
};

module.exports = verifyToken;
