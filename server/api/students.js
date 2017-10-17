const api = require('express').Router()
const db = require('../../db')
const { Student, Campus } = require('../../db/models')

api.get('/', (req,res,next) => {
  Student.findAll({})
  .then(studentData => res.json(studentData))
  .catch(err => console.error("Ruh-roh ...", err));
})

api.get('/:studentId', (req,res,next) => {
  Student.findAll({
    where: {
      id: req.params.studentId
    }
  })
  .then(studentData => res.json(studentData))
  .catch(err => console.error("Ruh-roh ...", err));
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
  .catch(err => console.error("Ruh-roh ...", err));
})

api.put('/:studentId', (req,res,next) => {
  Student.findOne({
    where: {
      id: req.params.studentId
    }
  })
  .then(res => {
    res.update({
      name: req.body.name || res.name,
      pictureUrl: req.body.pictureUrl || res.pictureUrl,
      email: req.body.email || res.email
    })
  })
  .then(() => res.send('Student successfully updated!'))
})

module.exports = api;