var express = require('express');
var router = express.Router();
const User = require('../models/User')

router.post('/resources', (req, res) => {
  res.json({ success: true });
})

// let dave = new User({Username: 'Dave', Tweets: [1,3,5], Friends: ['bob', 'jannette', 'brad']})
// dave.save();
// console.log(dave)

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/register', function (req, res)  {
});

router.post('/register', async (req, res) => {
  try {
    const newUser = new User({
    Username: 'Dave', 
    Password: 'Davepass',
    Email: 'dave@mail.com',
    Tweets: [1,3,5], 
    Friends: ['bob', 'jannette', 'brad']
  });
    console.log(newUser)

    const user = await newUser.save();
    res.status(200).json(user);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
    }
})

router.get('')

module.exports = router;
