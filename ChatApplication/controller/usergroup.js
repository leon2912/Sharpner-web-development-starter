const User = require('../models/user');

const Chat = require('../models/chat');

const Group = require('../models/group');

const Usergroups = require('../models/usergroup');



exports.isAdmin  = async(req,res,next)=>{
    let groupId = req.params.groupId 
    try {
        if(!groupId){
            return res.status(400).json({message:'no group id found'})
        }
        let group = await Group.findByPk(groupId);
        if(!group){
            return res.status(404).json({message:'no group found'})
        }
        let row= await  Usergroups.findOne({where:{userId:req.user.id , groupId:groupId }})
        let isAdmin = row.isAdmin ;
        return res.status(200).json(isAdmin)
    } catch (err) {
        res.status(500).json({error , message: "some error occured" });
    }
}

exports.fetchUsers = async (req,res,next)=>{
    
    try{

        let groupId = req.params.groupId;
        console.log(groupId);

        const group = await Group.findByPk(groupId);

        if(!group){
            return res.status(400).json({message:"no group found"})
        }

        let users = await group.getUsers()
        let data = users.filter(user=> user.id != req.user.id)

        return res.status(200).json(data)

    }
    catch(err){
        console.log(err);
    }
}




exports.makeAdmin = async (req,res,next)=>{
    const {userId, groupId} = req.body;


    try{

        if(!userId || !groupId){
            return res.status(400).json({message:'no group found'})
        }

        let checkAdmin = await Usergroups.findOne({where:{userId:req.user.id, groupId:groupId}})
        let isAdmin = checkAdmin.isAdmin;
        if(!isAdmin){
            return res.status(402).json({message:'user not admin'})
        }

        let user = await User.findByPk(userId);
        let group =await Group.findByPk(groupId);

        if(!user || !group){
            return res.status(404).json({message:'user not found'})
        }
        let result = await group.addUser(user , {through:{isAdmin:true}});

        if(!result){
            return res.status(401).json({message:'unable to make admin' })
        }
        return res.status(200).json({user , message:"user is admin now"})


    }
    catch(err){
        res.status(500).json({err , message: "some error occured" });

    }



}


exports.removeAdmin = async (req,res,next)=>{
    const {userId, groupId} = req.body;

    try{

        if(!userId || !groupId){
            return res.status(400).json({message:'no group found'})

        }

        let checkAdmin = await Usergroups.findOne({where:{userId:req.user.id, groupId:groupId}})
        let isAdmin = checkAdmin.isAdmin;
        if(!isAdmin){
            return res.status(402).json({message:'user not admin'})
        }

        let user = await User.findByPk(userId);
        let group = await Group.findByPk(groupId);

        if(!user || !group){
            return res.status(404).json({message:'user not found'})
        }

        let rem = await group.addUser(user , {through:{isAdmin:false}});

        if(!rem){
            return res.status(401).json({message:'unable to make admin' })
        }
        return res.status(200).json({user , message:"user is admin now"})


    }
    catch(err){
        res.status(500).json({err , message: "some error occured" });

    }

}

exports.addUser = async(req,res,next)=>{
    const{email, groupId} = req.body;

    try{
        console.log('>>>>>>>>');
        console.log(email);
        console.log(groupId);
        if(!email || !groupId){
            return res.status(400).json({message:'enter all fields'})
        }
        let user = await User.findOne({where:{email}});
        let group =await  Group.findByPk(groupId);

        console.log('<><><><>><><><>');
        console.log(user);

        if(!user || !group){
            return res.status(400).json({message:'No user found'})
        }

        let checkAdmin = await Usergroups.findOne({where:{userId:req.user.id, groupId:groupId}})
        let isAdmin = checkAdmin.isAdmin;
        if(!isAdmin){
            return res.status(402).json({message:'user not admin'})
        }

        const data = await group.addUser(user,{through:{isAdmin:false}});
        return res.status(200).json({user , message:'added user to group'});

    }

    catch(error){
        res.status(500).json({error , message: "some error occured" });

    }


}


exports.removeUser = async (req,res,next)=>{
    const {userId,groupId} = req.body;
    try{
        console.log('*********************');
        console.log('inside remove user');
        console.log(userId);
        console.log(groupId);
        if(!userId || !groupId){
            return res.status(400).json({message:'no group found'})
        }

        let checkAdmin = await Usergroups.findOne({where:{userId:req.user.id, groupId:groupId}})
        let isAdmin = checkAdmin.isAdmin;
        console.log(isAdmin);
        if(!isAdmin){
            return res.status(402).json({message:'user not admin'})
        }

        let user = await User.findByPk(userId);
        let group =await Group.findByPk(groupId);
        console.log('~~~~~~~~');
        console.log(user,group);

        if(!user || !group){
            return res.status(404).json({message:'user not found'})
        }

        let rem = await group.removeUser(user);

        if(!rem){
            return res.status(401).json({message:'unable to remove user' })
        }
        return res.status(200).json({user , message:"user removed"})






    }
    catch(error){
        res.status(500).json({error , message: "some error occured" });

    }


}