module.exports = {
  attributes: {
    body: { type: 'string', required: true },
    author: { model: 'User' }, // association
    message: { model: 'Message' } // association
  },
};
