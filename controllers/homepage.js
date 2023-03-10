const { Post, User,} = require('../models');
const router = require('express').Router();

router.get('/', (req, res) => {
    Post.findAll({
        attributes: [
            'id',
            'title',
            'postContent',
        ],
        include: [{
            model: User,
            attributes: ['username']
        }]
    })
        .then(postData => {
            const posts = postData.map(post => post.get({ plain: true }));
            res.render('homepage', { posts, loggedIn: req.session.loggedIn });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

router.get('/login', (req, res) => {
    if (req.session.loggedIn) {
        res.redirect('/');
        return;
    }
    res.render('login');
});

router.get('/signup', (req, res) => {
    res.render('signup');
});

router.get('/posts/:id', (req, res) => {
    Post.findOne({
        where: {
            id: req.params.id
        },
        attributes: [
            'id',
            'title',
            'postContent',
        ],
        include: [{
            model: User,
            attributes: ['username']
        }]
    })
        .then(postData => {
            if (!postData) {
                res.status(404).json({ message: 'No post found' });
                return;
            }
            const post = postData.get({ plain: true });
            console.log(post);
            res.render('singlePost', { post, loggedIn: req.session.loggedIn });


        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

module.exports = router;