const jwt = require("jsonwebtoken");
const User = require("../models/userModel.js");
const asyncHandler = require( "express-async-handler");

const protect = asyncHandler(async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];

      //decodes token id
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      console.log('decoded: ', decoded);

      // req.user = await User.findById(decoded.id).select("-password");
      req.user = await User.findById(decoded.id);
      next();
    } catch (error) {
      res.status(401);
      throw new Error("Not authorized, token failed");
    }
  }

  if (!token) {
    res.status(401);
    throw new Error("Not authorized, no token");
  }
});

// Middleware to authenticate user by verifying his/her jwt-token.
// async function auth(req, res, next) {
//   let token = req.headers["authorization"];
//   token = token.split(" ")[1]; //Access token

//   jwt.verify(token, "access", async (err, user) => {
//       if (user) {
//           req.user = user;
//           next();
//       } else if (err.message === "jwt expired") {
//           return res.json({
//               success: false,
//               message: "Access token expired"
//           });
//       } else {
//           console.log(err);
//           return res
//               .status(403)
//               .json({ err, message: "User not authenticated" });
//       }
//   });
// }

module.exports = { protect };