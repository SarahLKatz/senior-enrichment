const api = require('express').Router()
const db = require('../../db')
const { Campus } = require('../../db/models')

api.get('/', (req,res,next) => {
  Campus.findAll({})
  .then(campusData => res.json(campusData))
  .catch(err => console.error("Ruh-roh ...", err));
})

api.get('/:campusId', (req,res,next) => {
  const id = Number(req.params.campusId)
  Campus.findById(id)
  .then(campusData => res.json(campusData))
  .catch(err => console.error("Ruh-roh ...", err));
})

api.get('/:campusId/students', (req,res,next) => {
  const id = Number(req.params.campusId)
  Campus.findById(id)
  .then(campus => campus.getStudents())
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
  const id = Number(req.params.campusId)
  Campus.findById(id)
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

api.delete('/:campusId', (req,res,next) => {
  const id = Number(req.params.campusId)
  Campus.findById(id)
  .then(campus => campus.destroy())
  .then(() => res.send('Campus successfully deleted'))
})

module.exports = api;