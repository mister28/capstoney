var express = require('express');
var router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User')
const Chirp = require('../models/Chirp')

/* GET users listing. */
router.get('/api/chirp', function(req, res, next) {
});

router.post('/api/chirp', function(req, res, next) {
  const newChirp = new Chirp({
    Content: 'This is the content of the blog post.',
    Author: '64f90d218f4b9c2450bdad69',
  });

  newChirp.save()
    .then((savedChirp) => {
      console.log('Chirp saved successfully:', savedChirp);
    })
    .catch((error) => {
      console.error('Error saving Chirp:', error);
    });
});

router.put('/api/chirp/edit/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body; 
    
    // Find the document by ID and update it
    const updatedDocument = await Chirp.findByIdAndUpdate(id, updates, {
      new: true, // Return the updated document
    });

    if (!updatedDocument) {
      return res.status(404).json({ message: 'Document not found' });
    }

    // Respond with the updated document
    res.json(updatedDocument);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

router.get('/api/register', function (req, res)  {
});

router.post('/api/register', async (req, res) => {
  const { firstName, lastName, Username, Password, Email } = req.body;
  try {
    const existingUser = await User.findOne({ Username });
    console.log("existingUser", existingUser);
    if (existingUser) {
      return res.status(400).send("Username already taken.");
    }
    const newUser = new User({
      firstName,
      lastName,
      Username,
      Password,
      Email,
      Chirp: [],
      Friends: [],
    });

    await newUser.save();

    res.redirect("/api/login");
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).send("An error occurred while creating the user.");
  }
})

router.get('/api/login', function(req, res, next) {
});

router.post("/api/login", async (req, res) => {
  const { Username, Password } = req.body;
  try {
    // Find the user in the MongoDB database
    const user = await User.findOne({ Username });

    if (!user) {
      return res.render("login", { title: "Login", error: "User not found" });
    }
    // Compare the provided password with the hashed password
    const hashedPW = user.Password;
    const passwordMatch = await bcrypt.compare(Password, hashedPW);

    if (passwordMatch) {
      // Generate a JWT token upon successful login
      const token = jwt.sign({ Username: user.Username, id: user._id }, "secretToken");
      // Set the token as a cookie
      res.cookie("token", token);
      // Redirect to the user's profile
      return res.redirect("/api/register");
    } else {
      return res.render("login", { title: "Login", error: "Passwords do not match" });
    }
  } catch (error) {
    // Handle any errors that occur during the database query or bcrypt operation
    console.error(error);
    return res.status(500).send("Internal Server Error");
  }
});

router.get('/api/profile', function(req, res, next) {
});

router.post('/api/profile', function(req, res, next) {
});

router.get('/api/friends', function(req, res, next) {
});

router.post('/api/friends', function(req, res, next) {
});

module.exports = router;
