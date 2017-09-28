const express = require('express');
const router = express.Router();
const fs = require('fs');

const passport = require('../config/passport');
const jwt = require('jsonwebtoken');
const jwtOptions = require('../config/jwt');

const User = require('../models/user-model');
const Marker = require('../models/marker-model')
const bcrypt = require('bcrypt');
const bcryptSalt = 10;

router.post('/signup', (req, res, next) => {
  let username = req.body.username;
  let password = req.body.password;
 
  
  if (!username || !password) {
    res.status(400).json({
      message: 'Provide username and password'
    });
    return;
  }

  User.findOne({
    username
  }, '_id', (err, foundUser) => {
    if (foundUser) {
      res.status(400).json({
        message: 'The username already exists'
      });
      return;
    }

    let salt = bcrypt.genSaltSync(bcryptSalt);
    let hashPass = bcrypt.hashSync(password, salt);

    const theUser = new User({
      username,
      password: hashPass
      
    });
    console.log(theUser);
    theUser.save((err, user) => {
      if (err) {
        res.status(400).json({
          message: err
        });
      } else {
        const payload = {
          id: user._id,
          user: user.username
        };
        const token = jwt.sign(payload, jwtOptions.secretOrKey);
        console.log(user)
        res.status(200).json({
          token,
          user
        });
      }
    });
  });
});

router.post('/marker', (req, res) => {
  console.log('in service');
  const setUpMarker = new Marker({
    markerName: req.body.markerName,
    lat: req.body.lat,
    lng: req.body.lng,
    draggable: req.body.draggable
  });
  console.log(req.body);
  
  setUpMarker.save((err) => {
     if (err) {
       console.log('error', err);
       res.json(err);
       return;
     }

     res.json({
       message: 'New  marker created',
       id: setUpMarker._id
     });
  });
});

router.get('/marker', (req, res) => {
  Marker.find({}, (err, markers) => {
    if (err) {
      res.json(err);
      return;
    }

    res.json(markers);
  })
})

router.put('/user/:id', (req, res) => {
  console.log('in service');
  console.log('in service2');
  
  const updates = {
    username: req.body.username,
    name: req.body.name,
    lastName: req.body.lastName,
    favouriteSports: req.body.favouriteSports
  };

  console.log(req.body);
  User.findByIdAndUpdate(req.params.id, updates, (err) => {
    if (err) {
      res.json(err);
      return;
    }

    res.json({
      message: 'Profile detailes updated successfully'
    });
  });
});



router.post('/newSpot', (req, res, next) => {


})

router.post('/login', (req, res, next) => {
  let username = req.body.username;
  let password = req.body.password;

  if (!username || !password) {
    res.status(401).json({
      message: 'Provide username and password'
    });
    return;
  }

  User.findOne({
    'username': username
  }, (err, user) => {
    if (!user) {
      res.status(401).json({
        message: 'The username or password is incorrect'
      });
      return;
    }

    bcrypt.compare(password, user.password, (err, isMatch) => {
      if (!isMatch) {
        res.status(401).json({
          message: 'The username or password is incorrect'
        });
      } else {
        const payload = {
          id: user._id,
          user: user.username
        };
        const token = jwt.sign(payload, jwtOptions.secretOrKey);
        console.log('user id', user._id);
        res.status(200).json({
          token,
          user
        });
      }
    });
  });
});

router.get('/ping', passport.authenticate('jwt', {
  session: false
}), (req, res) => {
  res.json('Pong');
});




module.exports = router;
