module.exports = {
  attributes: {
    id: { type: 'number' },
    body: { type: 'string', required: true },
    createdAt: { type: 'number', defaultsTo: Date.now() },
    author: { model: 'User' } // association
  },
}
