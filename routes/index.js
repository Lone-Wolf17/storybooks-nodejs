const express = require('express');
const router = express.Router();
const { ensureAuth, ensureGuest } = require('../middleware/auth.js');
const Story = require('../models/Story.js');

// @desc         Login/Landing Page
// @route       Get /
// Middleware ensures that signed in User can't access this route
router.get('/', ensureGuest, (req, res) => {
    res.render('login', {
        layout: 'login'
    });
});

// @desc         Dashbaord
// @route       Get /dashboard
// Middleware ensures that only signed in user can access this route
router.get('/dashboard', ensureAuth, async (req, res) => {

    try {
        const stories = await Story.find({ user: req.user.id }).lean()
        res.render('dashboard', {
            name: req.user.firstName,
            stories
        });
    } catch (err) {
        console.error(err);
        res.render('error/500');
    }
});

module.exports = router;