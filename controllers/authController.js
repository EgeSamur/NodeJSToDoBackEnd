/*DataBase Part's */
const sequelize = require("../data/db")
const UserModel = require("../models/userModel")
const EventModel = require("../models/eventModel")
UserModel.hasMany(EventModel);

async function connectModels()
{
    await sequelize.sync({ alter: true });
    console.log("All models were synchronized successfully.");
}
connectModels()
/*************************************************************/



/*MİDDLEWARES */
const {Op} = require("sequelize")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt");

/*************************************************************/



module.exports.postLogin = async function(req,res){
    const username = req.body.username

    const password = req.body.password


    const user = await UserModel.findOne({where:{ 
        username:username
        
    }})

    if(user != null){
        const token = jwt.sign({user_id:user.id,username:user.username},"ACCESS_TOKEN")
        const matchPassword = await bcrypt.compare(password,user.password)
        if(user.username == username && matchPassword){
        return res.json({user_id:user.id,access_token:token})
    }
    else{
        return res.json({message:"Wrong username or password.",process:false})
    }
    }

    else{
        return res.json({message:"user doesnt exist.",process:false})
    }
    
}



module.exports.postRegister = async function(req,res){
    //şeklinde tanımlandığında req.body.firstname lastname vs aynı olmalı yoksa olmaz
    

    const result = await UserModel.findAll({
        where: {
          [Op.or]: [
            { username: req.body.username },
            { email: req.body.email },
            { tc_no: req.body.tc_no },
            { phone_number: req.body.phone_number }
          ]
        }
      });

    console.log(result)

    if(result.length>0){
        return res.json({message:"User Already Exist.",process:false})
    }
    else{
        const token = jwt.sign({username:req.body.username},"ACCESS_SECRET_TOKEN")
        const hashedPassword = await bcrypt.hash(req.body.password,10)
        
        const createdUser = await UserModel.create({
            firstname:req.body.firstname,
            lastname:req.body.lastname,
            username:req.body.username, 
            phone_number:req.body.phone_number,
            tc_no:req.body.tc_no,
            email:req.body.email,
            password:hashedPassword,
            auth_token:token
        })
        // const decodedToken = jwt.verify(token, 'ACCESS_SECRET_TOKEN');
        console.log(createdUser)
        // console.log(decodedToken)
        
        return res.json({username:createdUser.username,user_id:createdUser.id,
            access_token:createdUser.auth_token})
    }

}