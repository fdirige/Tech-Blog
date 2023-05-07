const express = require("express");
const router = express.Router();
const {User, Blog, Comment} = require("../../models");
const withAuth = require('../../util/auth')

//GET blogs, users, comments
router.get('/', (req, res) => {
    Blog.findAll({include:[User, Comment]})
    .then(dbBlogs => {
        res.json(dbBlogs);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({msg: "Error", err});
    });
});

//GET blog with related user and comment
router.get('/:id', (req, res) => {
    Blog.findByPk(req.params.id,{include:[User, Comment]})
    .then(dbBlog => {
        res.json(dbBlog);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({msg: "Error", err});
    });
});

//Create blog post
router.post('/', (req, res) => {
    if(!req.session.user){
        return res.status(401).json({msg: "Please log in"})
    }
    Blog.create({
        title: req.body.title,
        content: req.body.content,
        userId: req.session.user.id
    })
    .then(newBlog => {
        res.json(newBlog);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({msg: "Error"});
    });
});

//Put post
router.put('/:id', (req, res) => {
    if(!req.session.user){
        return res.status(401).json({msg: "Please log in"})
    }
    Blog.update(req.body, {
        where: {
            id: req.params.id
        }
    }).then(updatedBlog => {
        res.json(updatedBlog);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({msg: "Error", err});
    });
});

router.delete('/:id', (req, res) => {
    if(!req.session.user){
        return res.status(401).json({msg: "Please log in"})
    }
    Blog.destroy({
        where: {
            id: req.params.id
        }
    }).then(deleteBlog => {
        res.json(deleteBlog);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({msg: "Error", err});
    });
});

module.exports = router;