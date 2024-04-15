const router = require('express').Router();
const { Comment, User, Post } = require('../../models');
const withAuth = require('../../utils/auth');

router.post("/", async (req, res) => {
  try {
    const comment = await Comment.create({
      comment_text: req.body.comment_text,
      post_id: req.body.post_id,
      user_id: req.session.user_id || req.body.user_id,
    });

    res.status(200).json(comment);
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

// READ all Comments
router.get("/", async (req, res) => {
  try {
    const commentData = await Comment.findAll({
      include: [
        {
          model: User,
          attributes: ["username"],
        },
        {
          model: Post,
          attributes: ["id"],
        },
      ],
    });
    res.status(200).json(commentData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// UPDATE Comment
router.put("/:id", async (req, res) => {
  try {
    const updatedComment = await Comment.update(req.body, {
      where: {
        id: req.params.id,
      },
    });

    if (!updatedComment[0]) {
      res.status(400).json({ message: "No comment found with that id!" });
      return;
    }

    console.log("Comment updated!");
    res.status(200).json(updatedComment);
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

// DELETE Comment
router.delete("/:id", async (req, res) => {
  try {
    const comment = await Comment.destroy({
      where: {
        id: req.params.id,
      },
    });
    if (!comment) {
      res.status(404).json({ message: "No comment found with that id!" });
      return;
    }
    res.status(200).json(comment);
  } catch (err) {
    res.status(500).json(err);
  }
});

//Create a comment
router.post('/', withAuth, (req, res) => {
   if (req.session) {
       Comment.create({
               comment_text: req.body.comment_text,
               post_id: req.body.post_id,
               user_id: req.session.user_id
           })
           .then(dbCommentData => res.json(dbCommentData))
           .catch(err => {
               console.log(err);
               res.status(400).json(err);
           });
   }
 });

 module.exports = router;