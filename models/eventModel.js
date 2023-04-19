const Sequelize = require("sequelize")
const sequelize = require("../data/db")

const EventModel = sequelize.define("events",{
    event_id:{
        type:Sequelize.INTEGER,
        autoIncrement:true,
        allowNull:false,
        primaryKey:true
    }
    ,
    event_type:{
        type:Sequelize.STRING,
        allowNull:false,
    },
    event_status:{
        type:Sequelize.STRING,
        allowNull:false,
        defaultValue:true // --> true is active
    }
    ,
    event_action:{
        type:Sequelize.STRING,
        allowNull:false,
    },
    event_start_time:{
        type:Sequelize.DATEONLY,
        allowNull:false,
        defaultValue: Sequelize.NOW
    }
    ,
    event_finish_date:{
        type:Sequelize.DATEONLY,
        allowNull:false
    }
})

module.exports = EventModel