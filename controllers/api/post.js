const router = require('express').Router();
const { Post, User } = require('../../models');
const withAuth = require('../../utils/auth');

//get all post
router.get('/', (req, res) => {
    Post.findAll({
            attributes: [
                'id',
                'title',
                'postContent'
            ],
            order: [
                ['id', 'DESC']
            ],
            include: [{
                    model: User,
                    attributes: ['username']
                }]
        })
        .then(postData => res.json(postData))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });

});
// get post by id
router.get('/:id', (req, res) => {
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
                }],
        })
        .then(postData => {
            if (!postData) {
                res.status(404).json({ message: 'No post found' });
                return;
            }
            res.json(postData);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});
//create post
router.post('/', withAuth, (req, res) => {
    Post.create({
            title: req.body.title,
            postContent: req.body.postContent,
            userId: req.session.userId
        })
        .then(postData => res.json(postData))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});
//update post
router.put('/:id', withAuth, (req, res) => {
    Post.update({
            title: req.body.title,
            postContent: req.body.postContent
        }, {
            where: {
                id: req.params.id
            }
        }).then(postData => {
            if (!postData) {
                res.status(404).json({ message: 'No post found' });
                return;
            }
            res.json(postData);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});
//update post
router.delete('/:id', withAuth, (req, res) => {
    Post.destroy({
        where: {
            id: req.params.id
        }
    }).then(postData => {
        if (!postData) {
            res.status(404).json({ message: 'No post found' });
            return;
        }
        res.json(postData);
    }).catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

module.exports = router;