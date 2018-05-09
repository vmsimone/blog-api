const uuid = require('uuid');

const {BlogPost, Recipes} = require('./models');

BlogPost.create('First Post', 'Just seeing if this works', 'Me', '5/8/2018');
BlogPost.create('Haiku', 'Haiku are easy \n But sometimes they don\'t make sense \n Refrigerator', 'Me', '5/8/2018');
BlogPost.create('Coding', 'Still don\'t speak binary. What a 01101010 01101111 01101011 01100101', 'Me', '5/8/2018');


uuid.get('/blog-posts', (req, res) =>{
  res.json(BlogPost.get());
});

uuid.post('/blog-posts', (req, res) =>{
  
});

uuid.update('/blog-posts/:id', (req, res) =>{

});

uuid.delete('/blog-posts/:id', (req, res) =>{

});

uuid.listen(process.env.PORT || 8080, () => {
  console.log(`Your app is listening on port ${process.env.PORT || 8080}`);
});
