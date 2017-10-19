import React, {Component} from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';

export default class SingleCampus extends Component {
  constructor() {
    super();
    this.state = {
      currentStudent: {},
    }
  }

  componentDidMount(){
    axios.get(`/api/students/${+this.props.id}`)
    .then(res => res.data)
    .then(currentStudent => this.setState({currentStudent}));
  }

  render() {
    const student = this.state.currentStudent;
    let campus = this.props.campuses.filter(campus => campus.id === student.campusId);
    if (campus.length) campus = campus[0];
    return (
      <div className="container">
        <div className="col-xs-3">
          <img src={student.pictureUrl} />
        </div>
        <div className="col-xs-7">
          <h3>{student.name}</h3>
          <h4>Campus: <Link to={`/campuses/${campus.id}`}>{campus.name}</Link></h4>
          <h5>Email: {student.email}</h5>
        </div>
      </div>
    )
  }
}