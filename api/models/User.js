module.exports = {
  attributes: {
    userName: { type: 'string', required: true, maxLength: 50},
    messages: { model: 'Message' }
  },
}
