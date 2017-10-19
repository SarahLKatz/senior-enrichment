import React, {Component} from 'react';
import { Route, Switch, Redirect, history } from 'react-router-dom';
import axios from 'axios';
import Navbar from './Navbar';
import AllCampuses from './AllCampuses';
import SingleCampus from './SingleCampus';
import AddCampus from './AddCampus';
import EditCampus from './EditCampus';
import AllStudents from './AllStudents';
import SingleStudent from './SingleStudent'
import AddStudent from './AddStudent';

export default class App extends Component {
  constructor() {
    super();
    this.state = {
      campuses: [],
      students: []
    }
    this.addCampus = this.addCampus.bind(this);
    this.addStudent = this.addStudent.bind(this);
    this.deleteStudent = this.deleteStudent.bind(this);
  }

  componentDidMount(){
    axios.get('/api/campuses')
    .then(res => res.data)
    .then(campuses => this.setState({campuses}))
    axios.get('/api/students')
    .then(res => res.data)
    .then(students => this.setState({students}))
  }

  addCampus(evt) {
    evt.preventDefault();
    const newCampus = {
      name: evt.target.name.value,
      pictureUrl: evt.target.pictureUrl.value,
      address: evt.target.address.value,
      email: evt.target.email.value
    }
    axios.post('/api/campuses', newCampus)
    .then((res) => {
      console.log('Your new campus has been created!')
    })
  }

  addStudent(evt) {
    evt.preventDefault();
    const newStudent = {
      name: evt.target.name.value,
      pictureUrl: evt.target.pictureUrl.value,
      email: evt.target.email.value,
      campusId: evt.target.campusId.value
    }
    axios.post('/api/students', newStudent)
    .then((res) => {
      console.log('Your new student has been created!')
    })
  }

  deleteStudent(evt) {
    const studentToDelete = evt.target.id;
    axios.delete(`/api/students/${studentToDelete}`)
    .then(() => console.log('Student has been deleted'))
    .then(() => {
      axios.get('/api/students')
      .then(res => res.data)
      .then(students => this.setState({students}))
    })
  }

  render() {
    return (
      <div>
        <Navbar campuses={this.state.campuses} />
        <Switch>
          <Route exact path="/" render={() => <AllCampuses campuses={this.state.campuses} />} />
          <Route path="/campuses/add" render={(props) => <AddCampus addCampus={this.addCampus}/>} />
          <Route path="/campuses/:campusId/edit" component={EditCampus} />
          <Route path="/campuses/:campusId" component={SingleCampus} />
          <Route path="/campuses" render={() => <AllCampuses campuses={this.state.campuses} />} />
          <Route exact path="/students" render={() => <AllStudents campuses={this.state.campuses} students={this.state.students} deleteStudent={this.deleteStudent}/>} />
          <Route path="/students/add" render={(props) => <AddStudent campuses={this.state.campuses} addStudent={this.addStudent}/>} />
          <Route path="/students/:studentId" render={(props) => <SingleStudent campuses={this.state.campuses} id={props.match.params.studentId}/>} />
  
        </Switch>
        {/* Footer? */}
      </div>
    )
  }
} 