
const Chat = require('../models/chat')
const User = require('../models/user');
const { Op }  = require("sequelize");
const { where } = require('sequelize');



exports.postMessage = async (req, res, next) => {
  const message = req.body.message;
  const groupId = req.body.groupId;
  let arr = [];
  try {
    const userId = req.user.dataValues.id;
    let loggedUser = await User.findByPk(userId);
    const data = await loggedUser.createChat({ message: message,groupId:groupId,username: loggedUser.dataValues.name });
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
    let groupId = req.query.groupId;
    let lastMessageId = req.query.lastMessageId;
    console.log(lastMessageId);
    let chats = await Chat.findAll({where:{id:{[Op.gt]:lastMessageId},groupId:groupId}});
    // {where:{groupId}}
    // console.log(chats.length);
    console.log(chats);
    res.status(200).json({ chats:chats });
  }
  catch (err) {
    console.log(err);
    res.status(402).json({ err:err })
  }

}