// FIGURE THIS OUT!! - MAYBE MAKE IT A TABLE?
import React, {Component} from 'react';
import axios from 'axios';
import { Link, Redirect } from 'react-router-dom';

export default class EditCampus extends Component {
  constructor() {
    super();
    this.state = {
      currentCampus: {},
      students: [],
      hasChanged: false
    }
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount(){
    axios.get(`/api/campuses/${+this.props.match.params.campusId}`)
    .then(res => res.data)
    .then(currentCampus => this.setState({currentCampus}));
    axios.get(`/api/campuses/${+this.props.match.params.campusId}/students`)
    .then(res => res.data)
    .then(students => this.setState({students}));
  }

  handleSubmit(evt) {
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


  render () {
    const campus = this.state.currentCampus;
    console.log(this.state)
    if (this.state.hasChanged) {
      return (
        <Redirect from={`/campuses/${this.state.currentCampus.id}/edit`} to={`/campuses/${this.state.currentCampus.id}`} />
      ) 
    } else {
      return (
        <div>
          <form className="col-xs-8 col-xs-offset-2" onSubmit={this.handleSubmit}>
            <table className="table">
              <thead>
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
                  <td><a href={campus.pictureUrl}><img src={campus.pictureUrl} /></a></td>
                  <td><input type="text"  name="pictureUrl"></input> </td>
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