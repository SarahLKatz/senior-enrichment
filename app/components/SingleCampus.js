import React, {Component} from 'react';
import axios from 'axios';
import {Link, Redirect } from 'react-router-dom';
import store from '../store'
import { fetchSingleCampus, fetchDeleteCampus } from '../reducers'

export default class SingleCampus extends Component {
  constructor() {
    super();
    this.state = store.getState();
    this.deleteCampus = this.deleteCampus.bind(this);
  }

  componentDidMount(){
    store.dispatch(fetchSingleCampus(this.props.campusId));
    this.unsubscribe = store.subscribe(() => {
      this.setState(store.getState())
    })
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  deleteCampus(evt){
    evt.preventDefault();
    store.dispatch(fetchDeleteCampus(this.campusId, this.props.history))
  }

  render() {
    const campus = this.state.currentCampus;
    const campusStudents = this.state.students.filter(student => student.campusId === this.state.currentCampus.id)
    console.log(this.state);
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
            campusStudents.map(student => {
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