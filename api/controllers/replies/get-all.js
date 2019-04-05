module.exports = async function getAllMessages(req, res) {
  var messageId = req.param('id');
  if (!messageId) {
    return res.badRequest(new Error('No message id specified for reply'));
  }

  var _replies = await Reply.find({ message: messageId });

  for (var i = 0; i < _replies.length; i++) {
    // @TODO: store user's display name in reply model to improve performance
    // get the user's display name
    var author = await User.findOne({ id: _replies[i].author });
    _replies[i].author = author.userName;
    // remove unnecessary fields to reduce response body size
    delete _replies[i].updatedAt;
  }

  var replies = _replies.sort((a, b) => { // sort by time created (newest first)
    return b.createdAt - a.createdAt;
  });

  res.status(200);
  return res.json({
    status: 200,
    message: 'Found replies successfully',
    data: replies
  });
}
