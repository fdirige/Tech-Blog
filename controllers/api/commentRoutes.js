const express = require("express");
const router = express.Router();
const {User, Blog, Comment} = require ("../../models");

//GET comments
router.get("/", (req, res) => {
    Comment.findAll({include:[User, Blog]})
    .then(dbComments => {
        res.json(dbComments);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({msg: "Error"});
    });
});

//GET comments with related user and blog
router.get("/:id", (req, res) => {
    Comment.findByPk(req.params.id,{include:[User, Blog]})
    .then(dbComment => {
        res.json(dbComment);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({msg: "Error"});
    });
});

//Create comment
router.post("/", (res, req) => {
    if(!req.session.user){
        return res.status(401).json({msg: "Please log in"})
    }
    Comment.create({
        body:req.body.body,
        userId:req.session.user.id,
        blogId:req.body.blogId
    })
    .then(newComment => {
        res.josn(newComment);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({msg: "Error"});
    });
});

//Update comment
router.put("/:id", (req, res) => {
    if(!req.session.user){
        return res.status(401).json({msg: "Please log in"})
    }
    Comment.update(req.body, {
        where: {
            id: req.params.id
        }
    }).then(updatedComment => {
        res.json(updatedComment);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({msg: "Error"});
    });
});

//Delete comment
router.delete("/:id", (req, res) => {
    if(!req.session.user){
        return res.status(401).json({msg: "Please log in"})
    }
    Comment.destroy({
        where: {
            id: req.params.id
        }
    }).then(deleteComment => {
        res.json(deleteComment);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({msg: "Error", err});
    });
});

module.exports = router;
