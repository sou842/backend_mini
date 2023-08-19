const express = require('express');
const { postModel } = require('../model/postModel');
const { auth } = require('../middlewear/auth');

const postRouter = express.Router()

postRouter.get('/', async (req, res) => {
    try {
        const posts = await postModel.find({ userID: req.body.userId })
        res.status(200).json({ msg: 'all the posts', posts })
    } catch (err) {
        res.status(400).json({ error: err.massage })
    }
})

postRouter.post('/add', auth, async (req, res) => {

    try {
        const post = new postModel(req.body)
        await post.save();
        res.status(200).json({ msg: 'new post have been created...', post: req.body })
    } catch {
        res.status(400).json({ error: err.massage })
    }
})

postRouter.patch('/update/:postId', auth, async (req, res) => {
    const userIdCheck = req.body.userId;
    const { postId } = req.params;

    try {
        const post = await postModel.findOne({ _id: postId })
        const userpostId = post.userID;

        if (userIdCheck == userpostId) {
            await postModel.findByIdAndUpdate({ _id: postId }, req.body)
            res.status(200).json({ msg: 'the post have been updated' })

        } else {
            res.status(200).json({ msg: 'user is not authorization!!!' })
        }

    } catch (err) {
        res.status(400).json({ error: err.massage })
    }

})

postRouter.delete('/delete/:postId', auth, async (req, res) => {
    const userIdCheck = req.body.userId;
    const { postId } = req.params;

    try {
        const post = await postModel.findOne({ _id: postId })
        const userpostId = post.userID;

        if (userIdCheck == userpostId) {
            await postModel.findByIdAndDelete({ _id: postId }, req.body)
            res.status(200).json({ msg: 'the post have been deleted' })
        } else {
            res.status(200).json({ msg: 'user is not authorization!!!' })
        }

    } catch (err) {
        res.status(400).json({ error: err.massage })
    }

})

module.exports = { postRouter }