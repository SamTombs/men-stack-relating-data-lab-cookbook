const express = require('express');
const router = express.Router({ mergeParams: true }); 
const User = require('../models/user.js');


router.get('/', async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    const foods = user.pantry;
    res.render('foods/index.ejs', { foods, userId: req.params.userId });
  } catch (err) {
    console.log(err);
    res.redirect('/');
  }
});

router.get('/new', (req, res) => {
  res.render('foods/new.ejs', { userId: req.params.userId });
});

router.post('/', async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    user.pantry.push({ name: req.body.name });
    await user.save();
    res.redirect(`/users/${user._id}/foods`);
  } catch (err) {
    console.log(err);
    res.redirect('/');
  }
});

module.exports = router;

