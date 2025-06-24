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

router.get('/:pantryId', async (req, res) => {
    try {
    const user = await User.findById(req.session.user._id);
    const pantryItem = user.pantry.id(req.params.pantryId)
    console.log('User:', user);
console.log('Pantry:', user.pantry);

    res.render('foods/show.ejs', { food: pantryItem, userId: req.params.userId, pantryId: req.params.pantryId });
  } catch (err) {
    console.log(err);
    res.redirect('/');
  }
});

router.get('/:pantryId/edit', async (req, res) => {
    try {
    const user = await User.findById(req.session.user._id);
    const pantryItem = user.pantry.id(req.params.pantryId)

    res.render('foods/edit.ejs', { food: pantryItem, userId: req.params.userId, pantryId: req.params.pantryId });
  } catch (err) {
    console.log(err);
    res.redirect('/');
  }
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

router.delete('/:pantryId', async (req, res) => {
  try {
    const user = await User.findById(req.session.user._id);
    const item = user.pantry.id(req.params.pantryId);
    item.deleteOne();
    await user.save();
    res.redirect(`/users/${user._id}/foods`);
  } catch (error) {
    console.error('Error deleting pantry item:', error.message);
    res.redirect('/');
  }
});

router.put('/:pantryId', async (req, res) => {
  try {
    const user = await User.findById(req.session.user._id);
    const item = user.pantry.id(req.params.pantryId);
    item.set(req.body);
    await user.save();
    console.log("Updated item")
    res.redirect(`/users/${user._id}/foods`);
  } catch (error) {
    console.error('Error updating pantry item:', error.message);
    res.redirect('/');
  }
});

module.exports = router;

