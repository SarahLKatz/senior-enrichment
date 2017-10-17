const { db, Student, Campus } = require('./db/models');
const Promise = require('bluebird');
const {studentData, campusData} = require('./seedCreator')

db.sync({ force: true })
.then(() => console.log('Database be empty, yo!'))
.then(() => {
  
  const createStudents = Promise.map(studentData, student => {
    Student.create(student, {
      include: [Campus]
    });
  })

  const createCampuses = Promise.map(campusData, campus => {
    Campus.create(campus);
  });

  return Promise.all([createStudents, createCampuses])
  .then(() => {
    console.log('All synced up and nowhere to go...')
  })
})
.catch(err => console.error('Oops ... ', err))