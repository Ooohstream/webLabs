const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (authHeader) {
    jwt.verify(authHeader, process.env.SECRET_KEY, (err, user) => {
      if (err) {
        return res.status(403).json({ error: "Token is invalid!" });
      }
      req.user = user;
      next();
    });
  } else {
    res.status(401).json({ error: "Unauthenticated!" });
  }
};
