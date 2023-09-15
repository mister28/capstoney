const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const Chirp = require('../models/Chirp');

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
  console.log(Content)

  const newChirp = new Chirp({
    Content,
    Username,
    Timestamp, // Store the current date and time
  });

  newChirp.save()
    .then((savedChirp) => {
      console.log('Chirp saved successfully:', savedChirp);
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

router.post('/profile/edit/:Username', async (req, res) => {
  const Username = req.params;
  try {
    const filter =  Username
    const update = req.body;
    console.log(update);
    
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
    console.log(deletedUser)
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
