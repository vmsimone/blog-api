const chai = require('chai');
const chaiHttp = require('chai-http');

const {app, runServer, closeServer} = require('../server');

const expect = chai.expect;

chai.use(chaiHttp);

describe('Blog Post', function() {

  before(function() {
    return runServer();
  });

  after(function() {
    return closeServer();
  });

  it('should return list of blog posts on GET', function() {
    return chai.request(app)
      .get('/blog-posts')
      .then(function(res) {
        expect(res).to.have.status(200);
        expect(res).to.be.json;
        expect(res.body).to.be.a('array');

        expect(res.body.length).to.be.at.least(1);

        const expectedKeys = ['id', 'title', 'content', 'author', 'publishDate'];
        res.body.forEach(function(post) {
          expect(post).to.be.a('object');
          expect(post).to.include.keys(expectedKeys);
        });
      });
    });

    it('should add a new blog post on POST', function() {
    const newPost = {
      'title': 'Cool Post, Bro',
      'content': 'The sickest verbage you ever seen',
      'author': 'Dave',
      'publishDate': '5/13/18'
    }
    return chai.request(app)
      .post('/blog-posts')
      .send(newPost)
      .then(function(res) {
        expect(res).to.have.status(201);
        expect(res).to.be.json;
        expect(res.body).to.be.a('object');
        expect(res.body).to.include.keys('id', 'title', 'content', 'author', 'publishDate');
        expect(res.body.id).to.not.equal(null);
        expect(res.body).to.deep.equal(Object.assign(newPost, {id: res.body.id}));
      });
  });


  //CURRENTLY RETURNS A 404

  it('should update an existing post on PUT', function() {

    const updatedPost = {
      'title': 'Cooler Post, Bro',
      'content': 'You thought THAT was cool? Think again',
      'author': 'Dave',
      'publishDate': '5/13/18'
    };

    return chai.request(app)
      .get('/blog-posts')
      .then(function(res) {
        updatedPost.id = res.body[0].id;
        return chai.request(app)
          .put(`/blog-posts/${updatedPost.id}`)
          .send(updatedPost);
      })
      .then(function(res) {
        expect(res).to.have.status(204);
      });
  });

  it('should delete a blog post on DELETE', function() {
    return chai.request(app)
      .get('/blog-posts')
      .then(function(res) {
        return chai.request(app)
        .delete(`/blog-posts/${res.body[0].id}`);
      })
      .then(function(res) {
        expect(res).to.have.status(204);
      });
  })

});
