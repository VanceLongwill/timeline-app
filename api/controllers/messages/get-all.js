module.exports = async function getAllMessages(req, res) {
  var _messages = await Message.find();

  for (var i = 0; i < _messages.length; i++) {
    // @TODO: store user's display name in message model to improve performance
    // get the user's display name
    var author = await User.findOne({ id: _messages[i].author });
    _messages[i].author = author.userName;
    // remove unnecessary fields to reduce response body size
    delete _messages[i].updatedAt;
    // delete _messages[i].replies;
  }

  var messages = _messages.sort((a, b) => { // sort by time created (newest first)
    return b.createdAt - a.createdAt;
  });

  res.status(200);
  return res.json({
    status: 200,
    message: 'Found messages successfully',
    data: messages
  });
}
