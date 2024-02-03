const express = require("express");
const router = express.Router();
const {
  fetchAuthor,
  authorsGet,
  authorsUpdate,
  authorsDelete,
  authorsCreate,
  postsCreate,
} = require("./authors.controllers");

router.param("authorId", async (req, res, next, authorId) => {
  const author = await fetchAuthor(authorId, next);
  if (author) {
    req.author = author;
    next();
  } else {
    const err = new Error("Author Not Found");
    err.status = 404;
    next(err);
  }
});

router.get("/", authorsGet);
router.post("/", authorsCreate);

router.delete("/:authorId", authorsDelete);

router.post("/:authorId", postsCreate);

router.put("/:authorId", authorsUpdate);

module.exports = router;

