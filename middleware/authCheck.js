const jwt = require("jsonwebtoken");
const User = require("./models/user"); // Import your Mongoose User model

const authCheck = async (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    // No token found, user is not authenticated
    return res.redirect("/login");
  }

  try {
    // Verify the JWT token
    const decodedToken = jwt.verify(token, "secretToken");

    // Check if the user exists in the database using Mongoose
    const user = await User.findById(decodedToken.userId);

    if (!user) {
      // User not found in the database, user is not authenticated
      return res.redirect("/login");
    }

    // Attach the user data to the request object
    req.user = user;
    next(); // Proceed to the next middleware or route handler
  } catch (error) {
    // Token verification failed, user is not authenticated
    res.redirect("/login");
  }
};

module.exports = authCheck;