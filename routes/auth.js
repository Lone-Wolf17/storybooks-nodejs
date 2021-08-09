const passport = require('passport');
const express = require('express');
const router = express.Router();

// @desc         Auth with Google
// @route       Get /auth/google
router.get('/google', passport.authenticate('google', { scope: ['profile'] }));

// @desc         Google Auth with Ca;;
// @route       Get /dashboard
router.get('/google/callback',
    passport.authenticate('google', {
        failureRedirect: '/',
        successRedirect: '/dashboard'
    }));

module.exports = router;