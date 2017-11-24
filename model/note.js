var Sequelize = require('sequelize')
var config = require('./config.js')

var sequelize = new Sequelize(
  config.DB_NAME,
  config.USERNAME,
  config.PASSWORD,
  {
  host: 'localhost',
  dialect: 'mysql',
  operatorsAliases: false
})


var Note = sequelize.define('note', {
  text: {
    type: Sequelize.STRING
  },
  uid: {
    type: Sequelize.STRING
  }
})


module.exports.Note = Note