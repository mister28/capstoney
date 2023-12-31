const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const Chirp = require('../models/Chirp');
const { id } = require('date-fns/locale');

router.get('/mainfeed/:id', async (req, res) => {
  try {
    const ChirpInfo = await Chirp.find();
    res.send(ChirpInfo);

  } catch (error) {
    console.error(error)
    res.status(500).send("error");
  }
});


router.post('/mainfeed', function(req, res, next) {
  const { Content, Username } = req.body;
  const Timestamp = new Date(); // Set the Timestamp to the current date and time

  const newChirp = new Chirp({
    Content,
    Username,
    Timestamp, // Store the current date and time
  });

  newChirp.save()
    .then((savedChirp) => {
      res.json(savedChirp);
    })
    .catch((error) => {
      console.error('Error saving Chirp:', error);
      res.status(500).send("An error occurred while saving the chirp.");
    });
});

router.post('/likechirp/:id', async (req, res) => {
  const id = req.params
  try {
    const filter = id
    const update = req.body
    const updatedDocument = await User.findOneAndUpdate(filter, update,
      { new: true }
      );
    if (!updatedDocument) {
      return res.status(404).send("not updated");
    }
    res.json(updatedDocument);
  } catch (error) {
    console.error(error);
    res.status(500).send("error");
  }
});


router.get('/register', function (req, res)  {
});

router.post('/register', async (req, res) => {
  const { firstName, lastName, Username, Password, Email, profilePhoto } = req.body;
  try {
    const existingUser = await User.findOne({ Username });
    if (existingUser) {
      const responsedata = {Message: 'Username Already Taken'}
      return res.send(responsedata);
    }
    const newUser = new User({
      firstName,
      lastName,
      Username,
      Password,
      Email,
      Chirp: [],
      Friends: [],
      // profilePhoto,
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

  try {
    const user = await User.findOne({ Username: Username });

    if (!user) {
      const responsedata = {Message: 'Incorrect Username or Password'}
      return res.send(responsedata);
    }
    const passwordMatch = await bcrypt.compare(Password, user.Password);

    if (!passwordMatch) {
      const responsedata = {Message: 'Incorrect Username or Password'}
      return res.send(responsedata);
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
  try {
  const UserInfo = await User.findOne({ Username: Username });
  res.send(UserInfo);
} catch (error) {
  console.error(error)
  res.status(500).send("error");
}
})

router.post('/profile/edit/:Username', async (req, res) => {
  const Username = req.params;
  try {
    const filter =  Username
    const update = req.body;
    
    const updatedDocument = await User.findOneAndUpdate(filter, update,
      { new: true }
      );

    if (!updatedDocument) {
      return res.status(404).send("not updated");
    }
    res.json(updatedDocument);
  } catch (error) {
    console.error(error);
    res.status(500).send("error");
  }
});

router.delete('/delete/:Username', async (req, res) => {
  const Username = req.params
  try {
    const filter = Username
    const deletedUser = await User.findOneAndDelete(filter);
    res.send('deleted user')
    if (!deletedUser) {
      return res.status(404).json({ error: 'User not found' });
    }
    return res.status(204).send(); 
  } catch (error) {
    console.error(error);
  }
});

router.get('/profile/:Username', async (req, res) => {
  const Username  = req.params
  try {
      const ChirpInfo = await Chirp.find(Username);
      res.send(ChirpInfo);
  
    } catch (error) {
      console.error(error)
      res.status(500).send("error");
    }
  });

router.post('/profile', function(req, res, next) {
});

module.exports = router;
