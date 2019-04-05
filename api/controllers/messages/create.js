module.exports = async function create(req, res) {
  var userName = req.body.author;
  if (!userName || !userName.length) {
    return res.badRequest('No author specified for message');
  }
  var body = req.body.body;
  if (!body) {
    return res.badRequest('No body specified for message');
  }

  var foundUser = await User.findOne({ userName });
  // in this case, just create a new user (remove in future if we add auth/registration functionality)
  if (!foundUser) {
    foundUser = await User.create({ userName }).fetch();
  }

  var createdMessage;
  try {
    createdMessage = await Message.create({
      body,
      author: foundUser.id,
    }).fetch();
  } catch(e) {
    return res.serverError('Failed to create message ' + e);
  }

  res.status(201);
  return res.json({ status: 201, resourceId: createdMessage.id, message: 'Created message successfully' });
};
