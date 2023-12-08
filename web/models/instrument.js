const sequelize = require('../ulti/database');
const Sequelize = require('sequelize')

const Instrument = sequelize.define('instrument',{
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  title: Sequelize.STRING,
  imageUrl: Sequelize.STRING,
  description: Sequelize.STRING,
  videoId: Sequelize.STRING,
})

module.exports = Instrument
