var express = require('express');
var router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User')
const Chirp = require('../models/Chirp')

/* GET users listing. */
router.get('/chirp', function(req, res, next) {
});

router.post('/chirp', function(req, res, next) {
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

router.get('/register', function (req, res)  {
});

router.post('/register', async (req, res) => {
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

    res.send(newUser);
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).send("An error occurred while creating the user.");
  }
})

router.get('/login', function(req, res, next) {
});

router.post("/login", async (req, res) => {
  const { Username, Password } = req.body;
  console.log(Username);

  try {
    // Find the user in the MongoDB database
    const user = await User.findOne({ Username: Username });
    console.log(user);

    if (!user) {
      return res.status(404).send("User not found");
    }

    // Compare the provided password with the hashed password
    const passwordMatch = await bcrypt.compare(Password, user.Password);

    if (!passwordMatch) {
      return res.status(401).send("Incorrect password");
    }

    // Generate a JWT token upon successful login
    const token = jwt.sign({ username: user.Username, id: user._id }, "secretToken");

    // Set the token as a cookie and send it in the response
    res.cookie("token", token);
    res.json({ token }); // Sending the token as JSON

  } catch (error) {
    // Handle any errors that occur during the database query or bcrypt operation
    console.error(error);
    res.status(500).send("An error occurred during login");
  }
});



router.get('/profile', function(req, res, next) {
});

router.post('/profile', function(req, res, next) {
});

router.get('/friends', function(req, res, next) {
});

router.post('/friends', function(req, res, next) {
});

module.exports = router;
