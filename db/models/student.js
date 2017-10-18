const Sequelize = require('sequelize');
const db = require('../');

let Student = db.define('student', {
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  pictureUrl: {
    type: Sequelize.STRING
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false
  }
})

module.exports = Student;