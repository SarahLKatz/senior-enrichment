const api = require('express').Router()
const db = require('../../db')
const { Student } = require('../../db/models')

api.get('/', (req,res,next) => {
  Student.findAll({})
  .then(studentData => res.json(studentData))
  .catch(next);
})

api.get('/:studentId', (req,res,next) => {
  const id = Number(req.params.studentId)
  Student.findById(id)
  .then(studentData => {
    if (studentData.id) {
      res.json(studentData)
    }
  })
  .catch(next);
})

api.post('/', (req,res,next) => {
  const newStudent ={
    name: req.body.name,
    pictureUrl: req.body.pictureUrl,
    email: req.body.email
  };
  Student.create(newStudent)
  .then(student => {
    res.status(201).send();
    res.redirect(`/students/${student.id}`);
  })
  .catch(next);
})

api.put('/:studentId', (req,res,next) => {
  const id = Number(req.params.studentId)
  Student.findById(id)
  .then(res => {
    res.update({
      name: req.body.name || res.name,
      pictureUrl: req.body.pictureUrl || res.pictureUrl,
      email: req.body.email || res.email
    })
  })
  .then(() => res.send('Student successfully updated!'))
})

api.delete('/:studentId', (req,res,next) => {
  const id = Number(req.params.studentId)
  Student.findById(id)
  .then(student => student.destroy())
  .then(() => res.send('Student successfully deleted'))
})


module.exports = api;