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
          <div className="col-xs-5">
            <img src={campus.pictureUrl} />
            <div className="col-xs-6 col-offset-1">
              <Link to={`${campus.id}/edit`}><button className="btn col-xs-12 btn-primary">Edit Campus</button></Link>
            </div>
            <div className="col-xs-6 col-offset-2">
              <button className="btn col-xs-12 btn-danger" onClick={this.deleteCampus}>Delete Campus</button>
            </div>
          </div>
          <div className="col-xs-7">
            <h3>{campus.name}</h3>
            <h5>Location: {campus.address}</h5>
            <h5>Contact: {campus.email}</h5>
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