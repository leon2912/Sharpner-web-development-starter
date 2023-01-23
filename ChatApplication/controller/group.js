const Group = require('../models/group');
const User = require('../models/user');
const Usergroups = require('../models/usergroup');


exports.getGroups = async(req,res,next)=>{

    try{
        console.log(req.user);
        let groups = await Usergroups.findAll({where:{userId:req.user.id}})
        let data = [];
        for(let i=0;i<groups.length;i++){
            let group = await Group.findByPk(groups[i].groupId);
            data.push(group);
        }
        if(!data){
            res.status(404).json({message:"no data found"})
        }
        res.status(200).json({data , message:"found groups"})

    }

    catch(err){
        console.log(err);
        res.status(500).json(err)
    }
}


exports.createGroup = async(req,res,next)=>{
    const {grpName} = req.body;
    try{
        if(!grpName){
            res.status(404).json({message:"no name entered"})
        }
        console.log(`>>>>>>>Inside Create Group${grpName}`);
        let data = await req.user.createGroup({name:grpName},  {through:{isAdmin:true}});
        console.log(`>>>>>>>Inside Create Group  ${data}`);
        res.status(201).json({ message:'successfully created new group'})

    }
    catch(err){
        console.log(err)
        return res.status(500).json(err);

    }
}