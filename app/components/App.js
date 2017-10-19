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
import EditStudent from './EditStudent';
import store from '../store'
import { fetchAllCampuses, fetchAllStudents, fetchAddCampus } from '../reducers/'

export default class App extends Component {
  constructor() {
    super();
    this.state = store.getState();
    // this.state = {
    //   campuses: [],
    //   students: [],
    //   redirect: false
    // }
    this.addCampus = this.addCampus.bind(this);
    // this.addStudent = this.addStudent.bind(this);
    // this.deleteStudent = this.deleteStudent.bind(this);
  }

  componentDidMount(){
    store.dispatch(fetchAllCampuses());
    store.dispatch(fetchAllStudents());
    store.subscribe(() => {
      this.setState(store.getState())
    })
  }

  componentWillUnmount() {
    store.unsubscribe();
  }

  addCampus(evt) {
    evt.preventDefault();
    const newCampus = {
      name: evt.target.name.value,
      pictureUrl: evt.target.pictureUrl.value,
      address: evt.target.address.value,
      email: evt.target.email.value
    }
    store.dispatch(fetchAddCampus(newCampus));
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
          <Route exact path="/" component={AllCampuses} />
          <Route path="/campuses/add" render={(props) => <AddCampus addCampus={this.addCampus} />} />
          <Route path="/campuses/:campusId/edit" render={(props) => <EditCampus campusId={props.match.params.campusId} history={props.history}/>} />
          <Route path="/campuses/:campusId" render={(props) => <SingleCampus history={props.history} campusId={props.match.params.campusId} />} />
          <Route path="/campuses" render={() => <AllCampuses campuses={this.state.campuses} />} />
          <Route exact path="/students" render={() => <AllStudents campuses={this.state.campuses} students={this.state.students} deleteStudent={this.deleteStudent}/>} />
          <Route path="/students/add" render={(props) => <AddStudent campuses={this.state.campuses} addStudent={this.addStudent} redirect={this.state.redirect}/>} />
          <Route path="/students/:studentId/edit" render={(props) => <EditStudent studentId={props.match.params.studentId} campuses={this.state.campuses}/>} />
          <Route path="/students/:studentId" render={(props) => <SingleStudent SingleCampus history={props.history} studentId={props.match.params.studentId} deleteStudent={this.deleteStudent}/>} />
  
        </Switch>
        {/* Footer? */}
      </div>
    )
  }
} 