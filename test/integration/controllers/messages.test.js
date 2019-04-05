var supertest = require('supertest');

describe('messages controller', () => {
  describe('getAllMessages', () => {
    it('should get a list of messages with the correct properties', (done) => {
      supertest(sails.hooks.http.app)
        .get('/api/v1/messages')
        .expect(200)
        .expect('Content-Type', /json/)
        .expect(
          hasKeysInData('createdAt', 'body', 'author', 'id')
        )
        .end(done);
    });
  });

  describe('createMessage', () => {
    it('should create a new message', (done) => {
      var body = 'some message';
      var author = 'some author';
      supertest(sails.hooks.http.app)
        .post('/api/v1/messages')
        .send({body, author})
        .set('Accept', 'application/json')
        .expect(201)
        .expect('Content-Type', /json/)
        .expect((res) => {
          if (!('resourceId' in res.body)) {throw new Error(`missing ${key} key`);}
        })
        .end(done);
    });
    var cases = [{body: 'some message'}, {author: 'some user'}, {}];
    cases.forEach(data => {
      it('should fail to create a new message without an author and/or body', (done) => {
        supertest(sails.hooks.http.app)
          .post('/api/v1/messages')
          .send(data)
          .set('Accept', 'application/json')
          .expect(400)
          .expect('Content-Type', /json/)
          .end(done);
      });
    });
  });
});

function hasKeysInData(...keys) {
  return (res) => {
    if (!('data' in res.body)) {
      throw new Error('body should contain data key');
    }
    if (!res.body.data || !res.body.data.length) {
      console.warn('Empty data field');
      return;
    }
    keys.forEach(key => {
      if (!(key in res.body.data[0])) {throw new Error(`missing ${key} key`);}
    });
  };
}
