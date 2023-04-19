 /*DataBase Part's */
 const sequelize = require("../data/db")
 const UserModel = require("../models/userModel")
 const EventModel = require("../models/eventModel")
 UserModel.hasMany(EventModel);
 async function connectModels()
 {
     await sequelize.sync({ alter: false });
     console.log("All models were synchronized successfully.");
 }
 connectModels()
 /*************************************************************/




// /*MİDDLEWARES */

 const {Op} = require("sequelize")
// const jwt = require("jsonwebtoken")
// const bcrypt = require("bcrypt");

// /*************************************************************/


module.exports.showEvents = async function(req,res){
    console.log(req.userData.username)
    const user = await UserModel.findOne({where:{username:req.userData.username}})
    console.log(user.dataValues.id)
    

    
    const result = await EventModel.findAll({where:{
        userId : user.dataValues.id
    }})
    
    
    return res.json(result)
    // eğer aktif değilse gösterme diye yapmıştım ama undefined diyor bakcıaz sonra 
    // if(result.event_status){
    //     return res.json(result)
    // }
    // else{
    //     return res.json({message:"You have not active duty."})
    // }
    
}



module.exports.addEvent = async function(req,res){
    const event_type = req.body.event_type
    const event_action = req.body.event_action
    const event_finish_date = req.body.event_finish_date
    //authdan dönen req.userData.username ile user sorgusu yapıyoruz dönen user.dataValues.id değerini event_user_id ye atıyoruz.
    const user = await UserModel.findOne({where:{
        username:req.userData.username
    }})
    const event_user_id = user.dataValues.id
    
    const createdEvent = await EventModel.create({
        event_type:event_type,
        event_action:event_action,
        userId:event_user_id,
        event_finish_date:event_finish_date
    })
    
    return res.json(createdEvent)

}

//bir update işlemi :event_id gönderecek.
module.exports.event_Status_Change = async function(req,res){
    // event tamamlandı butonuna bastığında body içersinde event_status:false şeklinde değer döner
    const event_status = req.body.event_status

    const event = await EventModel.findOne({
        where:{
            event_id:req.params.event_id
        }
    })

    console.log(event)

    if(event != null){
        const updated_Event = await event.update({event_status:event_status})

        return res.json(updated_Event)
    }
    else{
        return res.json({message:"id ile eşleşen event bulunamadı."})
    }
    
}


module.exports.event_delete = async function(req,res){
    // event tamamlandı butonuna bastığında body içersinde event_status:false şeklinde değer döner

    const event = await EventModel.findOne({
        where:{
            event_id:req.params.event_id
        }
    })

    if(event != null){
        const deletedEvent =await event.destroy()
        return res.json({deletedEvent})
    }
    else{
        return res.json({message:"id ile eşleşen event bulunamadı."})
    }
    
}
