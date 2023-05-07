const router = require('express').Router();
const apiRoutes = require('./api');
const userRoutes = require('./api/userRoutes.js');
const blogRoutes = require('./api/blogRoutes');
const commentRoutes = require('./api/commentRoutes');
const frontEnd = require('./frontendRoutes');

router.use('/api/users', userRoutes);
router.use('/api/blogs',blogRoutes);
router.use('/api/comments',commentRoutes);
router.use('/', frontEnd);

// router.use('/showsessions', (req, res) => {
//     res.json(req.session)
// })

router.use((req, res) => {
    res.status(400).end();
});

module.exports = router;