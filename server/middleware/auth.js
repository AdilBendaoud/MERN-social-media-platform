import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
  try {
    let passedToken = req.header("Authorization");
    if (!passedToken) res.status(403).send("Access denied");

    let token = passedToken.slice(7, passedToken.length).trimLeft();
    const isVerified = jwt.verify(token, process.env.SECRET_KEY);
    if (isVerified) {
      req.user = isVerified;
    }
    next();
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
