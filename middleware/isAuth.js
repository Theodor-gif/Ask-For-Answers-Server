import jwt from "jsonwebtoken";

export default function isAuth(req, res, next) {
  try {
    if (
      req.headers.authorization &&
      req.headers.authorization.split(" ")[0] === "Bearer" &&
      req.headers.authorization.split(" ")[1]
    ) {
      const token = req.headers.authorization.split(" ")[1];
      const payload = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

      req.user = payload;
      next();
    } else {
      res.status(400).json({ message: "Invalid token" });
    }
  } catch (error) {
    next(error);
  }
}
