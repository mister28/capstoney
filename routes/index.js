const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const Chirp = require('../models/Chirp');
const mongoose = require('mongoose');
const passport = require('passport');

/* GET users listing. */
router.get('/MainFeed/:id', async (req, res) => {
  try {
    const id = '64fa7e2f62fde51427f72e4e';
    const ChirpInfo = await Chirp.find({"Author": id });
    console.log(ChirpInfo)
    res.send(ChirpInfo);

  } catch (error) {
    console.error(error)
    res.status(500).send("error");
  }
});

router.post('/mainfeed', function(req, res, next) {
  const { Content } = req.body;
  console.log(Content)

  const newChirp = new Chirp({
    Content,
    Author: '64fa7e2f62fde51427f72e4e',
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
    const user = await User.findOne({ Username: Username });
    console.log(user);

    if (!user) {
      return res.status(404).send("User not found");
    }
    const passwordMatch = await bcrypt.compare(Password, user.Password);

    if (!passwordMatch) {
      return res.status(401).send("Incorrect password");
    }
    const token = jwt.sign({ username: user.Username, id: user._id }, "secretToken");
    // Set the token as a cookie and send it in the response
    res.cookie("token", token);
    res.json({ token }); // Sending the token as JSON

  } catch (error) {
    console.error(error);
    res.status(500).send("An error occurred during login");
  }
});

router.get('/profile/edit/:Username', async (req, res) => {
  const Username = req.params.Username;
  console.log(Username)
  try {
  // const id = '64fa0fd18213fc890bec9d43';
  const UserInfo = await User.findOne({ Username: Username });
  console.log(UserInfo)
  res.send(UserInfo);
} catch (error) {
  console.error(error)
  res.status(500).send("error");
}
})

router.post('/profile/edit/:id', async (req, res) => {
  try {
    const filter = { _id:'64fa0fd18213fc890bec9d43' };
    const update = req.body;
    console.log(update);
    
    // Find the document by ID and update it
    const updatedDocument = await User.findOneAndUpdate(filter, update,
      { new: true }
      );

    if (!updatedDocument) {
      return res.status(404).send("not updated");
    }
    // Respond with the updated document
    res.json(updatedDocument);
  } catch (error) {
    console.error(error);
    res.status(500).send("error");
  }
});

router.delete('/delete/:id', async (req, res) => {
  try {
    const userId = '64fa0fd18213fc890bec9d43';

    // Find the user by ID and delete it
    const deletedUser = await User.findOneAndDelete({ _id: userId });
    res.send('deleted user')
    if (!deletedUser) {
      return res.status(404).json({ error: 'User not found' });
    }
    return res.status(204).send(); // Respond with a success status (204 No Content)
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'An error occurred while deleting the user' });
  }
});

router.get('/profile', async (req, res) => {
  try {
    // Fetch user data from the database (e.g., based on user authentication)
    const user = await User.findById(req.user.id); // Assuming you have authentication middleware

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Respond with user data
    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
});

router.post('/profile', function(req, res, next) {
});

router.get('/friends', function(req, res, next) {
});

router.post('/friends', function(req, res, next) {
});

module.exports = router;
