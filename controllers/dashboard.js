const router = require('express').Router();
const { Post, User, } = require('../models');
const withAuth = require('../utils/auth');
//get post
// router.get('/', withAuth, (req, res) => {
//     Post.findAll({
//             where: {
//                 userId: req.session.userIdd
//             },
//             attributes: [
//                 'id',
//                 'title',
//                 'postContent'
//             ],
//             include: [{
//                 model: User,
//                 attributes: ['username']
                
//             }]
//         })
//         .then(postData => {
//             const posts = postData.map(post => post.get({ plain: true }));
//             res.render('dashboard', { posts, loggedIn: true });
//         })
//         .catch(err => {
//             console.log(err);
//             res.status(500).json(err);
//         });
// });
//get post 
// router.get('/edit/:id', withAuth, (req, res) => {
//     Post.findOne({
//             where: {
//                 id: req.params.id
//             },
//             attributes: ['id',
//                 'title',
//                 'postContent',
//             ],
//             include: [{
//                     model: User,
//                     attributes: ['username']
//                 }]
//         })
//         .then(postData => {
//             if (!postData) {
//                 res.status(404).json({ message: 'No post found' });
//                 return;
//             }

//             const post = postData.get({ plain: true });
//             res.render('edit-post', { post, loggedIn: true });
//         })
//         .catch(err => {
//             console.log(err);
//             res.status(500).json(err);
//         });
// })
// router.get('/new', (req, res) => {
//     res.render('post');
// });

module.exports = router;