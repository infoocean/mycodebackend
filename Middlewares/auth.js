const jwt = require("jsonwebtoken");
const acces_data_secret_key = process.env.JWT_SECRET_KEY;
const verifyAuthToken = (req, res, next) => {
  const token = req.headers["token"];
  //console.log(token);
  if (!token) {
    return res
      .status(403)
      .send({ message: "A token is required for authentication" });
  }
  try {
    const decoded = jwt.verify(token, acces_data_secret_key);
    //console.log(decoded);
  } catch (err) {
    return res.status(401).send({ message: "Invalid Token" });
  }
  return next();
};

module.exports = { verifyAuthToken };
