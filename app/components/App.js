import React, {Component} from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import axios from 'axios';
import Navbar from './Navbar';
import AllCampuses from './AllCampuses';
import SingleCampus from './SingleCampus';
import AddCampus from './AddCampus';
import EditCampus from './EditCampus';
import AllStudents from './AllStudents';
import SingleStudent from './SingleStudent'
import AddStudent from './AddStudent';
import EditStudent from './EditStudent';
import ErrorPage from './ErrorPage';

export default class App extends Component {
  constructor() {
    super();
    this.state = {
      campuses: [],
      students: [],
      redirect: false
    }
    this.addCampus = this.addCampus.bind(this);
    this.addStudent = this.addStudent.bind(this);
  }

  componentDidMount(){
    axios.get('/api/campuses')
    .then(res => res.data)
    .then(campuses => campuses.filter(campus => campus.id !== 101))
    .then(campuses => this.setState({campuses}))
    axios.get('/api/students')
    .then(res => res.data)
    .then(students => this.setState({students}))
    this.setState({redirect: false})
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
    .then(axios.get('/api/campuses')
      .then(res => res.data)
      .then(campuses => this.setState({
        campuses: campuses, 
        redirect: true
      }))
    )
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
    .then(axios.get('/api/students')
      .then(res => res.data)
      .then(students => this.setState({
        students: students, 
        redirect: true
      }))
    )
  }

  deleteStudent(evt) {
    evt.preventDefault();
    const studentToDelete = evt.target.id;
    axios.delete(`/api/students/${studentToDelete}`)
    .then(() => console.log('Student has been deleted'))
  }

  render() {
    return (
      <div>
        <Navbar campuses={this.state.campuses} />
        <Switch>
          <Route 
            exact 
            path="/" 
            render={() => <AllCampuses campuses={this.state.campuses} />} 
          />
          <Route 
            path="/campuses/add" 
            render={(props) => <AddCampus addCampus={this.addCampus} redirect={this.state.redirect}/>} 
          />
          <Route 
            exact
            path="/campuses/:campusId/edit" 
            render={(props) => <EditCampus campusId={props.match.params.campusId} allStudents={this.state.students} history={props.history}/> } 
          />
          <Route 
            exact
            path="/campuses/:campusId" 
            component={SingleCampus} 
          />
          <Route 
            path="/campuses" 
            render={() => <AllCampuses campuses={this.state.campuses} />} 
          />
          <Route 
            exact 
            path="/students" 
            render={() => <AllStudents campuses={this.state.campuses} students={this.state.students} deleteStudent={this.deleteStudent}/>} 
          />
          <Route 
            path="/students/add" 
            render={(props) => <AddStudent campuses={this.state.campuses} addStudent={this.addStudent} redirect={this.state.redirect}/>} 
          />
          <Route 
            exact
            path="/students/:studentId/edit" 
            render={(props) => <EditStudent studentId={props.match.params.studentId} campuses={this.state.campuses}/>} 
          />
          <Route 
            exact
            path="/students/:studentId" 
            render={(props) => <SingleStudent campuses={this.state.campuses} id={props.match.params.studentId} history={props.history}/>} 
          />
          <Route component={ErrorPage} />
        </Switch>
      </div>
    )
  }
} 