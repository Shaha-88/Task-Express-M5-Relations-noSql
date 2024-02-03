const Post = require("../../models/Post");
const Tag = require("../../models/Tag");

const addTag = async (req, res, next) => {
  try {
    const { tagId } = req.params;
    const tag = await Tag.findById(tagId);
    await req.post.updateOne({
      $push: { tags: tag._id },
    });
   
    await tag.updateOne({
      $push: { posts: req.post._id },
    });
    res.status(204).end();
  } catch (error) {
    next(error);
  }
};

const createTag = async (req, res, next) => {
  try {
    const newTag = await Tag.create(req.body);
    res.status(201).json(newTag);
  } catch (error) {
    next(error);
  }
};

const fetchPost = async (postId, next) => {
  try {
    const post = await Post.findById(postId);
    return post;
  } catch (error) {
    next(error);
  }
};

const postsDelete = async (req, res, next) => {
  try {
    await Post.findByIdAndRemove({ _id: req.post.id });
    res.status(204).end();
  } catch (error) {
    next(error);
  }
};

const postsUpdate = async (req, res, next) => {
  try {
    await Post.findByIdAndUpdate(req.post.id, req.body);
    res.status(204).end();
  } catch (error) {
    next(error);
  }
};

const postsGet = async (req, res, next) => {
  try {
    const posts = await Post.find().populate({
      path: "author",
      select: "-_id", 
    });
    res.json(posts);
  } catch (error) {
    next(error);
  }
};


module.exports = {
  fetchPost,
  postsDelete,
  postsUpdate,
  postsGet,
  createTag,
  addTag,
};

