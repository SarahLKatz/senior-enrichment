const Sequelize = require('sequelize');
const db = require('../');

let Campus = db.define('campus', {
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  pictureUrl: {
    type: Sequelize.STRING
  },
  address: {
    type: Sequelize.STRING,
    allowNull: false
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false
  }
})

module.exports = Campus;