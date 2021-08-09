const passport = require('passport');
const express = require('express');
const router = express.Router();

// @desc         Auth with Google
// @route       Get /auth/google
router.get('/google', passport.authenticate('google', { scope: ['profile'] }));

// @desc         Google Auth with Callback
// @route       Get /dashboard
router.get('/google/callback',
    passport.authenticate('google', {
        failureRedirect: '/',
        successRedirect: '/dashboard'
}));

// @desc         Logout User
// @route       /auth/logout
router.get('/logout', (req, res) => {
    req.logout();
    res.redirect('/');
});

module.exports = router;