const router = require('express').Router();
const { User, Post} = require('../../models');
//get user
router.get('/', (req, res) => {
    User.findAll({
            attributes: { exclude: ['[password'] }
        })
        .then(userData => res.json(userData))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

//get single user
router.get('/:id', (req, res) => {
    User.findOne({
            attributes: { exclude: ['password'] },
            where: {
                id: req.params.id
            },
            include: [{
                    model: Post,
                    attributes: [
                        'id',
                        'title',
                        'postContent',
                    ]
                },
                {
                    model: Post,
                    attributes: ['title'],
                }
            ]
        })
        .then(userData => {
            if (!userData) {
                res.status(404).json({ message: 'No user found' });
                return;
            }
            res.json(userData);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

//create user
router.post('/', (req, res) => {
    User.create({
        username: req.body.username,
        password: req.body.password
    })

    .then(userData => {
            req.session.save(() => {
                req.session.userId = userData.id;
                req.session.username = userData.username;
                req.session.loggedIn = true;

                res.json(userData);
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

//login route
router.post('/login', (req, res) => {
    User.findOne({
            where: {
                username: req.body.username
            }
        }).then(userData => {
            if (!userData) {
                res.status(400).json({ message: 'No user found' });
                return;
            }
            const validPassword = userData.checkPassword(req.body.password);

            if (!validPassword) {
                res.status(400).json({ message: 'No user found' });
                return;
            }
            req.session.save(() => {

                req.session.userId = userData.id;
                req.session.username = userData.username;
                req.session.loggedIn = true;

                res.json({ user: userData, message: 'You are now logged in' });
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});
//
router.post('/logout', (req, res) => {
    if (req.session.loggedIn) {
        req.session.destroy(() => {
            res.status(204).end();
        });
    } else {
        res.status(404).end();
    }
});
//update user by id
router.put('/:id', (req, res) => {
    User.update(req.body, {
            individualHooks: true,
            where: {
                id: req.params.id
            }
        })
        .then(userData => {
            if (!userData[0]) {
                res.status(404).json({ message: 'No user found' });
                return;
            }
            res.json(userData);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});
//delete user by id
router.delete('/:id', (req, res) => {
    User.destroy({
            where: {
                id: req.params.id
            }
        })
        .then(userData => {
            if (!userData) {
                res.status(404).json({ message: 'No user found' });
                return;
            }
            res.json(userData);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

module.exports = router;