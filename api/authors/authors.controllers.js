const Author = require("../../models/Author");



const postsCreate = async (req, res) => {
    try {
      req.body.authorId = req.author._id; 
      const newPost = await Post.create(req.body);
      await Author.findByIdAndUpdate(req.author._id, {
        $push: { posts: newPost._id },
      });
      res.status(201).json(newPost);
    } catch (error) {
      next(error);
    }
  };


  const fetchAuthor = async (authorId, next) => {
    try {
      const author = await Author.findById(authorId);
      return author;
    } catch (error) {
      next(error);
    }
  };
  
  const authorsCreate = async (req, res) => {
    try {
      const newAuthor = await Author.create(req.body);
      res.status(201).json(newAuthor);
    } catch (error) {
      next(error);
    }
  };
  
  const authorsDelete = async (req, res) => {
    try {
      await Author.findByIdAndRemove({ _id: req.author.id });
      res.status(204).end();
    } catch (error) {
      next(error);
    }
  };
  
  const authorsUpdate = async (req, res) => {
    try {
      await Author.findByIdAndUpdate(req.author.id, req.body);
      res.status(204).end();
    } catch (error) {
      next(error);
    }
  };
  
  const authorsGet = async (req, res) => {
    try {
      const authors = await Author.find().populate({
        path: "posts",
        select: "name -_id",
      });
      res.json(authors);
    } catch (error) {
      next(error);
    }
  };
  
  module.exports = {
    fetchAuthor,
    authorsCreate,
    authorsDelete,
    authorsUpdate,
    authorsGet,
    postsCreate,
  };
 
  