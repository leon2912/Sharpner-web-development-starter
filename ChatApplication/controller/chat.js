
const Chat = require('../models/chat')
const User = require('../models/user');



exports.postMessage = async(req,res,next)=>{
    const message = req.body.message;
    try{
        console.log('inside post message');
        const arr = []
        let user = req.user;
        console.log(user);
        const userId = user.uniqno;
        let loggedUser = await User.findByPk(userId);
        const data = await loggedUser.createChat({message:message});
        const name =req.user.username;
        const details = {
          id: data.id,
          groupId: data.groupId,
          name:req.user.username,
          message: data.message,
          createdAt: data.createdAt
        }

        arr.push(details);



        res.status(200).json({arr, messages: 'successfully added message'})
  
      }
    catch(error){
      console.log(error);
      res.status(500).json(error);
    }
  
  }