'use strict'
const api = require('express').Router()
const db = require('../db')
const { Student, Campus } = require('../db/models')

// If you aren't getting to this object, but rather the index.html (something with a joke) your path is wrong.
	// I know this because we automatically send index.html for all requests that don't make sense in our backend.
	// Ideally you would have something to handle this, so if you have time try that out!
api.get('/hello', (req, res) => res.send({hello: 'world'}))

api.get('/campuses', (req,res,next) => {
  Campus.findAll({})
  .then(campusData => res.json(campusData))
  .catch(err => console.error("Ruh-roh ...", err));
})

api.get('/campuses/:campusId', (req,res,next) => {
  Campus.findAll({
    where: {
      id: req.params.campusId
    }
  })
  .then(campusData => res.json(campusData))
  .catch(err => console.error("Ruh-roh ...", err));
})

api.get('/campuses/:campusId/students', (req,res,next) => {
  Student.findAll({
    where: {
      campusId: req.params.campusId
    }
  })
  .then(students => res.json(students))
  .catch(err => console.error("Ruh-roh ...", err));
})

api.get('/students', (req,res,next) => {
  Student.findAll({})
  .then(studentData => res.json(studentData))
  .catch(err => console.error("Ruh-roh ...", err));
})

api.get('/students/:studentId', (req,res,next) => {
  Student.findAll({
    where: {
      id: req.params.studentId
    }
  })
  .then(studentData => res.json(studentData))
  .catch(err => console.error("Ruh-roh ...", err));
})

module.exports = api