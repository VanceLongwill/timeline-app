module.exports = async function create(req, res) {
  var userName = req.body.author;
  if (!userName || !userName.length) {
     return res.badRequest(new Error('No author specified for message'));
  }

  var foundUser = await User.findOne({ userName });

  if (!foundUser) {
    await User.create({ userName });
  }

  var _message = await Message.create({
    body: req.body.body,
    author: foundUser.id,
  })


  res.status(201);
  res.json(_message);
}
