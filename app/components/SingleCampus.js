//DELETE A CAMPUS

import React, {Component} from 'react';
import axios from 'axios';
import {Link, Redirect } from 'react-router-dom';

export default class SingleCampus extends Component {
  constructor() {
    super();
    this.state = {
      currentCampus: {},
      students: [],
      hasBeenDeleted: false
    }
    this.deleteCampus = this.deleteCampus.bind(this);
  }

  componentDidMount(){
    axios.get(`/api/campuses/${+this.props.match.params.campusId}`)
    .then(res => res.data)
    .then(currentCampus => this.setState({currentCampus}));
    axios.get(`/api/campuses/${+this.props.match.params.campusId}/students`)
    .then(res => res.data)
    .then(students => this.setState({students}));
  }

  deleteCampus(evt){
    evt.preventDefault();
    axios.delete(`/api/campuses/${this.state.currentCampus.id}`)
    .then(() => console.log('Campus has been deleted!'))
    .then(() => {
      this.setState({
        currentCampus: {},
        hasBeenDeleted: true
      })
    })
  }

  render() {
    const campus = this.state.currentCampus;
    if (this.state.hasBeenDeleted) {
      return <Redirect from={`/campuses/${this.props.match.params.campusId}`} to="/campuses" />
    } else {
      return (
        <div className="container">
          <h3 className="col-xs-7 col-xs-offset-5">{campus.name}</h3>
          <div className="row col-xs-5">
            <img src={campus.pictureUrl} className="campus-picture"/>
            <div className="row">
              <div className="col-xs-5">
                <Link to={`${campus.id}/edit`}><button className="btn col-xs-12 btn-primary campus-button">Edit Campus</button></Link>
              </div>
              <div className="col-xs-5 col-xs-offset-1">
                <button className="btn col-xs-12 btn-danger campus-button" onClick={this.deleteCampus}>Delete Campus</button>
              </div>
            </div>
          </div>
          <div className="col-xs-7">
            <h5>Location: {campus.address}</h5>
            <h5>Contact: {campus.email}</h5>
            <h6>Students:</h6>
            <ol>
            {
              this.state.students.map(student => {
                return (
                  <li key={student.id}><Link to={`/students/${student.id}`}>{student.name}</Link></li>
                )
              })
            }
            </ol>
          </div>
        </div>
      )
    }
  }
}