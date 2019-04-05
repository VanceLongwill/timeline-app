module.exports = async function getAllMessages(req, res) {
  // var userName = req.param('userName');
  // if (!userName || !userName.length) {
  //   return res.badRequest(new Error('No username specified'));
  // }



  res.json({
    status: 200,
    data: [{ body: 'some message' }]
  });
}
