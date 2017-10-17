const api = require('express').Router()
const db = require('../../db')
const { Student, Campus } = require('../../db/models')

api.get('/', (req,res,next) => {
  Campus.findAll({})
  .then(campusData => res.json(campusData))
  .catch(err => console.error("Ruh-roh ...", err));
})

api.get('/:campusId', (req,res,next) => {
  Campus.findAll({
    where: {
      id: req.params.campusId
    }
  })
  .then(campusData => res.json(campusData))
  .catch(err => console.error("Ruh-roh ...", err));
})

api.get('/:campusId/students', (req,res,next) => {
  Student.findAll({
    where: {
      campusId: req.params.campusId
    }
  })
  .then(students => res.json(students))
  .catch(err => console.error("Ruh-roh ...", err));
})

api.post('/', (req,res,next) => {
  const newCampus ={
    name: req.body.name,
    pictureUrl: req.body.pictureUrl,
    address: req.body.address,
    email: req.body.email
  };
  Campus.create(newCampus)
  .then(campus => {
    res.status(201).send();
  })
  .catch(err => console.error("Ruh-roh ...", err));
})

api.put('/:campusId', (req,res,next) => {
  Campus.findOne({
    where: {
      id: req.params.campusId
    }
  })
  .then(res => {
    res.update({
      name: req.body.name || res.name,
      pictureUrl: req.body.pictureUrl || res.pictureUrl,
      address: req.body.address || res.address,
      email: req.body.email || res.email
    })
  })
  .then(() => res.send('Campus successfully updated!'))
})

module.exports = api;