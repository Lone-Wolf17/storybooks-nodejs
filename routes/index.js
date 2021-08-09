const express = require('express');
const router = express.Router();
const { ensureAuth, ensureGuest } = require('../middleware/auth.js');

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
router.get('/dashboard', ensureAuth, (req, res) => {
    res.render('dashboard');
});

module.exports = router;