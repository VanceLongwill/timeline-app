module.exports = async function createReply(req, res) {
  var userName = req.body.author;
  if (!userName) {
    return res.badRequest('No author specified for reply');
  }

  // in this case, just create a new user (remove in future if we add auth/registration functionality)
  var foundUser = await User.findOne({ userName });
  if (!foundUser) {
    foundUser = await User.create({ userName }).fetch();
  }

  var messageId = req.param('id');
  if (!messageId) {
    return res.badRequest('No message id specified for reply');
  }

  var foundMessage = await Message.findOne({ id: messageId });
  if (!foundMessage) {
    return res.notFound('No message found with id ' + messageId);
  }

  var createdReply;
  try {
    createdReply = await Reply.create({
      body: req.body.body,
      author: foundUser.id,
      message: messageId,
    }).fetch();
    await Message.addToCollection(messageId, 'replies')
      .members([createdReply.id]);
  } catch(e) {
    return res.serverError('Failed to create reply ' + e);
  }

  res.status(201);
  return res.json({ status: 201, resourceId: createdReply.id, message: 'Replied to message successfully' });
};
