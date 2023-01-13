
const Chat = require('../models/chat')
const User = require('../models/user');



exports.postMessage = async (req, res, next) => {
  const message = req.body.message;
  try {
    const userId = req.user.dataValues.id;
    let loggedUser = await User.findByPk(userId);
    const data = await loggedUser.createChat({ message: message, username: loggedUser.dataValues.name });
    const name = req.user.username;
    const details = {
      id: data.id,
      groupId: data.groupId,
      name: req.user.username,
      message: data.message,
      createdAt: data.createdAt
    }

    arr.push(details);



    res.status(200).json({ arr, messages: 'successfully added message' })

  }
  catch (error) {
    console.log(error);
    res.status(500).json(error);
  }

}

exports.getMessages = async (req, res, next) => {
  try {
    let chats = await Chat.findAll();
    res.status(200).json({ chats:chats });
  }
  catch (err) {
    console.log(err);
    res.status(402).json({ err:err })
  }

}