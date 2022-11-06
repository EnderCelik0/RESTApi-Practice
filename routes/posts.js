const express = require('express');
const router = express.Router();
const Post = require('../models/Post');

// get back all the posts
router.get('/', async (req, res) => {
  try {
    const posts = await Post.find();
    res.json(posts);
  } catch (err) {
    res.json({ meesage: err });
  }
});

//SUBMIT THE POST
router.post('/', async (req, res) => {
  const post = new Post({
    title: req.body.title,
    description: req.body.description,
  });

  try {
    const savedPost = await post.save();
    res.json(savedPost);
  } catch (err) {
    res.json({ message: err });
  }
});

// SEARCH FOR THE SPECIFIC POST

router.get('/:postId', async (req, res) => {
  try {
    const post = await Post.findById(req.params.postId);
    res.json(post);
  } catch (err) {
    res.json({ meesage: err });
  }
});

// DELETE SPECIFIC POST

router.delete('/:postId', async (req, res) => {
  try {
    const deletePost = await Post.remove({ _id: req.params.postId });
    res.json(deletePost);
  } catch (err) {
    res.json({ message: err });
  }
});

// UPDATE POST

router.patch('/:postId', async (req, res) => {
  try {
    const updatedPost = await Post.updateOne(
      { _id: req.params.postId },
      { $set: { title: req.body.title } }
    );
    res.json(updatedPost);
  } catch (err) {
    res.json({ message: err });
  }
});

module.exports = router;
