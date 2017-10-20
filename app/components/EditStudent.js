//EDIT STUDENT INFO

import React, {Component} from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom'

export default class EditStudent extends Component {
  constructor() {
    super()
    this.state = {
      currentStudent: {},
      hasChanged: false
    } 
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount(){
    axios.get(`/api/students/${+this.props.studentId}`)
    .then(res => res.data)
    .then(currentStudent => this.setState({currentStudent}));
  }

  handleSubmit(evt) {
    evt.preventDefault();
    console.log(evt.target.email.value)
    axios.put(`/api/students/${+this.props.studentId}`, {
      name: evt.target.name.value || '',
      pictureUrl: evt.target.pictureUrl.value || '',
      email: evt.target.email.value || '',
      campusId: evt.target.campusId.value || ''
    })
    .then(() => this.setState({
      hasChanged: true
    }))
    .then(res => console.log('what the what?'))
  }

  render () {
    console.log(this.state)
    const student = this.state.currentStudent;
    const allCampuses = this.props.campuses;
    const studentCampus = allCampuses.find(campus => campus.id === +student.campusId)
    if (this.state.hasChanged) {
      return (
        <Redirect from={`/student/${student.id}/edit`} to={`/students/${student.id}`} />
      ) 
    } else {
      return (
        <div className="col-xs-8 col-xs-offset-2">
          <h3 className="text-center">Change Student Information:</h3>
          <form onSubmit={this.handleSubmit}>
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
                  <td>{student.name}</td>
                  <td><input type="text" name="name"></input> </td>
                </tr>
                <tr>
                  <td>Email</td>
                  <td>{student.email}</td>
                  <td><input type="text"  name="email"></input> </td>
                </tr>
                <tr>
                  <td>Picture</td>
                  <td><a href={student.pictureUrl}>{student.pictureUrl}</a></td>
                  <td><input type="text"  name="pictureUrl"></input> </td>
                </tr>
                <tr>
                  <td>Campus</td>
                  <td>{(studentCampus) ? studentCampus.name : null}</td>
                  <td>
                  {
                    <select name="campusId">
                      <option value={''}>Select a New Campus</option>
                      {
                        allCampuses.map(campus => {
                          return (
                            <option key={campus.id} value={campus.id}>{campus.name}</option>
                          )
                        })
                      }
                    </select>
                  }
                  </td>
                </tr>
              </tbody>
            </table>
            <button className="btn btn-primary" type="submit">Submit Changes</button>
          </form>
        </div>
      )
    }
  }
}