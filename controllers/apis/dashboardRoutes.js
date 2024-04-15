const router = require('express').Router();
const { Post } = require('../../models');
const withAuth = require('../../utils/auth');

router.put('/:id', withAuth, async (req, res) => {
    try {
      const post = await Post.update(
      {
        title: req.body.title,
        content: req.body.content
      },
      {
        where: {
          id: req.params.id,
        },
      });
      res.status(200).json(post);
    } catch (err) {
        res.status(500).json(err);
      };
  });

  module.exports = router;