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
  }
})

// Note.sync().then(() => {
//   return Note.create({
//     text: 'helloworld'
//   })
// })

// Note.findAll({raw: true, where: {id: 2}})
//   .then(function(notes) {
//     console.log(notes)
//   })
module.exports.Note = Note