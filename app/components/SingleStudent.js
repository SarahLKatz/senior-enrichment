import React, {Component} from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';
import store from '../store'
import { fetchSingleStudent } from '../reducers'

export default class SingleCampus extends Component {
  constructor() {
    super();
    // this.state = {
    //   currentStudent: {},
    //   changed: false
    // }
    this.state = store.getState();
    this.assignStudentToCampus = this.assignStudentToCampus.bind(this);
  }

  componentDidMount(){
    store.dispatch(fetchSingleStudent(this.props.studentId));
    this.unsubscribe = store.subscribe(() => {
      this.setState(store.getState())
    })
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  assignStudentToCampus(evt) {
    axios.put(`/api/students/${+this.props.id}`, {
      campusId: evt.target.value
    })
    .then(() => this.setState({
      changed: true,
      currentStudent: {
        campusId: evt.target.value
      }
    }))
  }

  render() {
    const student = this.state.currentStudent;
    let campus = this.state.campuses.filter(campus => campus.id === student.campusId);
    if (campus.length) campus = campus[0];
    return (
      <div className="container">
        <div className="col-xs-3">
          <img src={student.pictureUrl} />
        </div>
        <div className="col-xs-6">
          <h3>{student.name}</h3>
          <h4>Campus: {
            (this.state.currentStudent.campusId === 101) ? (
              <select onChange={this.assignStudentToCampus}>
                <option>Select a Campus For This Student</option>
                {
                  this.props.campuses.map(campus => {
                    return (
                      <option key={campus.id} value={campus.id}>{campus.name}</option>
                    )
                  })
                }
              </select>
            ) 
            : <Link to={`/campuses/${campus.id}`}>{campus.name}</Link>
          }</h4>
          <h5>Email: {student.email}</h5>
        </div>
        <div className="col-xs-3">
          <div className="col-xs-12 student-button">
            <Link to={`${student.id}/edit`}><button className="btn col-xs-12 btn-primary">Edit Student</button></Link>
          </div>
          <div className="col-xs-12 student-button">
            <button className="btn col-xs-12 btn-danger" id={student.id} onClick={this.props.deleteStudent}>Delete Student</button>
          </div>
        </div>
      </div>
    )
  }
}