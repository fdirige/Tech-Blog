const sequelize = require("../config/connection")
const {User, Blog, Comment} = require("../models")

const users = [
    {
        username: "Sebastian",
        password: "sebastianpassword123"
    },
    {
        username: "Freya",
        password: "freyapassword123"
    },
    {
        username: "Blake",
        password: "blakepassword123"
    },
]

const blogs = [
    {
        title: "Saturday chores",
        content: "homework",
        userId: 1
    },
    {
        title: "Sunday chores",
        content: "shopping",
        userId: 1
    },
    {
        title: "Cooking",
        content: "sushi",
        userId: 2
    },
    {
        title: "Shopping",
        content: "clothes",
        userId: 3
    },
]

const comments = [
    {
        body: "awesome",
        blogId: 1,
        userId: 1
    },
    {
        body: "nice",
        blogId: 3,
        userId: 2
    },
    {
        body: "cool",
        blogId: 4,
        userId: 1
    }
]

const plantSeeds = async () => {
    try {
        await sequelize.sync({force:true})
        await User.bulkCreate(users, {
            individualHooks:true
        });
        await Blog.bulkCreate(blogs);
        await Comment.bulkCreate(comments);
        process.exit(0);
    } catch(err){
        console.log(err)
    }
}

plantSeeds()