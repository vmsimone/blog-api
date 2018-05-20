const express = require('express');
const router = express.Router();

const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();

const {BlogPosts} = require('./models');


//initial database
BlogPosts.create('First Post', 'Just seeing if this works', 'Me', '5/8/2018');
BlogPosts.create('Haiku', 'Haiku are easy \n But sometimes they don\'t make sense \n Refrigerator', 'Me', '5/8/2018');
BlogPosts.create('Coding', 'Still don\'t speak binary. What a 01101010 01101111 01101011 01100101', 'Me', '5/8/2018');

function checkPostProperties(req, res) {
  const BlogPostsProperties = ['title', 'content', 'author', 'publishDate'];
  for (i=0; i<BlogPostsProperties.length; i++) {
    const thisProperty = BlogPostsProperties[i];
    if (!(thisProperty in req.body)) {
      const errMsg = `Error: ${thisProperty} not in request body.`;
      console.log(errMsg);
      return res.status(400).send(errMsg);
    };
  }
}

router.get('/', (req, res) => {
  res.json(BlogPosts.get());
});

router.post('/', jsonParser, (req, res) => {
    checkPostProperties(req, res);

    const newPost = BlogPosts.create(req.body.title, req.body.content, req.body.author, req.body.publishDate);
    res.status(201).json(newPost);
});

router.put('/:id', jsonParser, (req, res) => {
  checkPostProperties(req, res);

  if (req.params.id !== req.body.id) {
    const message = `Request path id (${req.params.id}) and request body id (${req.body.id}) must match`;
    console.error(message);
    return res.status(400).send(message);
  }

  BlogPosts.update({
    id: req.body.id,
    title: req.body.title,
    content: req.body.content,
    author: req.body.author,
    publishDate: req.body.publishDate
  });
  console.log(`Updating blog post with id \`${req.params.id}\``);
  res.status(204).end();
  });

router.delete('/:id', (req, res) => {
  BlogPosts.delete(req.params.id);
  console.log(`Deleted post with id \`${req.params.id}\``);
  res.status(204).end();
});

module.exports = router;
