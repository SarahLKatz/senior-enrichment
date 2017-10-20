//EDUT A CAMPUS
import React, {Component} from 'react';
import axios from 'axios';
import { Link, Redirect } from 'react-router-dom';

export default class EditCampus extends Component {
  constructor() {
    super();
    this.state = {
      currentCampus: {},
      students: [],
      hasChanged: false,
      studentRemoved: ''
    }
    this.handleInfoSubmit = this.handleInfoSubmit.bind(this);
    this.removeStudentFromCampus = this.removeStudentFromCampus.bind(this);
    this.addStudentToCampus = this.addStudentToCampus.bind(this)
  }

  componentDidMount(){
    axios.get(`/api/campuses/${+this.props.campusId}`)
    .then(res => res.data)
    .then(currentCampus => this.setState({currentCampus}));
    axios.get(`/api/campuses/${+this.props.campusId}/students`)
    .then(res => res.data)
    .then(students => this.setState({students}));
  }

  handleInfoSubmit(evt) {
    evt.preventDefault();
    const updatedCampus = {
      name: evt.target.name.value || '',
      pictureUrl: evt.target.pictureUrl.value || '',
      address: evt.target.address.value || '',
      email: evt.target.email.value || '',
    }
    axios.put(`/api/campuses/${this.state.currentCampus.id}`, updatedCampus)
    .then(() => {
      axios.get(`/api/campuses/${this.state.currentCampus.id}`)
      .then(res => res.data)
      .then(currentCampus => this.setState({currentCampus, hasChanged: true}))
    })
  }

  removeStudentFromCampus(evt) {
    evt.preventDefault();
    const removedStudentId = evt.target.id;
    console.log('I hit the function!, studentId: ', removedStudentId)
    axios.put(`/api/students/${+removedStudentId}`, {
      campusId: 101
    })
    .then(() => {
      this.props.history.push(`/students/${removedStudentId}`)
    })
  } 

  addStudentToCampus(evt) {
    evt.preventDefault();
    const newStudentId = evt.target.add.value;
    const newStudent = this.props.allStudents.find(student => student.id === +newStudentId)
    axios.put(`/api/students/${newStudentId}`, {
      campusId: this.state.currentCampus.id
    })
    .then(res => console.log(res))
    .then(() => this.setState({
      students: [...this.state.students, newStudent],
    }))
  }


  render () {
    const campus = this.state.currentCampus;
    const campusStudentIds = this.state.students.map(student => student.id);
    if (this.state.hasChanged) {
      return (
        <Redirect from={`/campuses/${this.state.currentCampus.id}/edit`} to={`/campuses/${this.state.currentCampus.id}`} />
      ) 
    } else if (this.state.studentRemoved) {
      return (
        <Redirect from={`/campuses/${this.state.currentCampus.id}/edit`} to={`/students/${this.state.studentRemoved}`} />
      ) 
    } else {
      return (
        <div className="col-xs-8 col-xs-offset-2">
          <h3>Change Campus Information:</h3>
          <form onSubmit={this.handleInfoSubmit}>
            <table className="table">
              <thead className="table-header">
                <tr>
                  <td>Field</td>
                  <td>Current Value</td>
                  <td>Enter New Value</td>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Name</td>
                  <td>{campus.name}</td>
                  <td><input type="text" name="name"></input> </td>
                </tr>
                <tr>
                  <td>Address</td>
                  <td>{campus.address}</td>
                  <td><input type="text"  name="address"></input> </td>
                </tr>
                <tr>
                  <td>Contact Email</td>
                  <td>{campus.email}</td>
                  <td><input type="text"  name="email"></input> </td>
                </tr>
                <tr>
                  <td>Picture</td>
                  <td><a href={campus.pictureUrl}>{campus.pictureUrl}</a></td>
                  <td><input type="text"  name="pictureUrl"></input> </td>
                </tr>
              </tbody>
            </table>
            <button className="btn btn-primary" type="submit">Submit Changes</button>
          </form>
          <h3>Change Campus Students:</h3>
            <table className="table">
              <thead className="table-header">
                <tr>
                  <td>Remove Students:</td>
                </tr>
              </thead>
              <tbody>
              {
               this.state.students.map(student => {
                return (
                  <tr key={student.id}>
                    <td>{student.name}</td>
                    <td><button className="btn btn-sucess" id={student.id} onClick={this.removeStudentFromCampus}>X</button></td>
                  </tr>
                )
               }) 
              }
              </tbody>
            </table>
            <table className="table">
              <thead className="table-header">
                <tr>
                  <td>Add Students:</td>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    <form id="add-student" onSubmit={this.addStudentToCampus}>
                      <select name="add">
                      {
                        this.props.allStudents.filter(student => !campusStudentIds.includes(student.id)).map(student => {
                          return (
                            <option key={student.id} value={student.id}>{student.name}</option>
                          )
                        })
                      }
                      </select>
                      <button type="submit">Add</button>
                    </form>
                  </td>
                </tr>
              </tbody>
            </table>
        </div>
      )
    }
  }
}