const sequelize = require("../data/db")
const Sequelize = require("sequelize")

const UserModel = sequelize.define("users",{
    id:{
        type:Sequelize.INTEGER,
        autoIncrement:true,
        allowNull:false,
        primaryKey:true
    }
    ,firstname:{
        type:Sequelize.STRING,
        allowNull:false,
    }
    ,lastname:{
        type:Sequelize.STRING,
        allowNull:false,
    }
    ,username:{
        type:Sequelize.STRING,
        allowNull:false,
    }
    ,tc_no:{
        type:Sequelize.STRING,
        allowNull:false,
    },
    phone_number:{
        type:Sequelize.STRING,
        allowNull:false,
    }
    ,email:{
        type:Sequelize.STRING,
        allowNull:false,
    }
    ,password:{
        type:Sequelize.STRING,
        allowNull:false,
    }
    ,auth_token:{
        type:Sequelize.STRING,
        allowNull:false,
    }
    ,isAdmin:{
        type:Sequelize.BOOLEAN,
        allowNull:false,
        defaultValue:false
    }
})




module.exports = UserModel