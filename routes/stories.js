const express = require('express');
const router = express.Router();
const { ensureAuth } = require('../middleware/auth.js');
const Story = require('../models/Story.js');

// @desc         Show add page
// @route       Get /stories/add
// Middleware ensures that only signed in User can access this route
router.get('/add', ensureAuth, (req, res) => {
    res.render('stories/add');
});

// @desc         Process Add Story Fam
// @route       POST /stories
// Middleware ensures that only signed in User can access this route
router.post('/', ensureAuth, async (req, res) => {
    try {
        req.body.user = req.user.id;
        await Story.create(req.body);
        res.redirect('/dashboard');
    } catch (err) {
        console.error(err);
        res.render('error/500');
    }
});

// @desc         Show add stories
// @route       Get /stories
// Middleware ensures that only signed in User can access this route
router.get('/', ensureAuth, async (req, res) => {
    try {
        const stories = await Story.find({ status: 'public' })
            .populate('user')
            .sort({ createdAt: 'desc' })
            .lean();

        res.render('stories/index', {
            stories
        });
    } catch (err) {
        console.error(err);
        res.render('error/500');
    }
});

// @desc         Show edit page
// @route       Get /stories/edit/:id
// Middleware ensures that only signed in User can access this route
router.get('/edit/:id', ensureAuth, async (req, res) => {
    const story = await Story.findOne({
        _id: req.params.id
    }).lean();

    if (!story) return res.render('error/404');
    
    if (story.user != req.user.id) {
        res.redirect('/stories');
    } else {
        res.render('stories/edit', {
            story
        });
    }
});


module.exports = router;