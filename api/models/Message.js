module.exports = {
  attributes: {
    body: { type: 'string', required: true },
    author: { model: 'User' }, // association
    replies: { collection: 'Reply', via: 'message' }, // association
  },
};
