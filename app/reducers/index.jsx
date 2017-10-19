import axios from 'axios';

const initialState = {
  campuses: [],
  students: [],
  currentCampus: {},
  currentStudent: {}
}

// Action Constants
const GET_CAMPUSES = 'GET_CAMPUSES';
const GET_SINGLE_CAMPUS = 'GET_SINGLE_CAMPUS';
const ADD_CAMPUS = 'ADD_CAMPUS';
const EDIT_CAMPUS = 'EDIT_CAMPUS';
// const REMOVE_STUDENT_FROM_CAMPUS = 'REMOVE_STUDENT_FROM_CAMPUS'; // Do after updating student stuff
// const ADD_STUDENT_TO_CAMPUS = 'ADD_STUDENT_TO_CAMPUS'; // Do after updating student stuff
const DELETE_CAMPUS = 'DELETE_CAMPUS';
const GET_STUDENTS = 'GET_STUDENTS';
const GET_SINGLE_STUDENT = 'GET_SINGLE_STUDENT';

// Action Creators
function getCampuses(campuses) {
  return {
    type: GET_CAMPUSES,
    campuses
  }
}

function getSingleCampus(currentCampus) {
  return {
    type: GET_SINGLE_CAMPUS,
    currentCampus
  }
}

function addCampus(newCampus){
  return {
    type: ADD_CAMPUS,
    newCampus
  }
}

function editCampus(updatedCampus){
  return {
    type: EDIT_CAMPUS,
    currentCampus: updatedCampus
  }
}

function deleteCampus() {
  return {
    type: DELETE_CAMPUS,
    currentCampus: {}
  }
}

function getStudents(students) {
  return {
    type: GET_STUDENTS,
    students
  }
}

function getSingleStudent(currentStudent) {
  return {
    type: GET_SINGLE_STUDENT,
    currentStudent
  }
}

// Thunks
export function fetchAllCampuses() {
  return function (dispatch) {
    axios.get('/api/campuses')
    .then(res => res.data)
    .then(campuses => {
      dispatch(getCampuses(campuses))
    })    
  }
}

export function fetchSingleCampus(campusId) {
  return function (dispatch) {
    axios.get(`/api/campuses/${campusId}`)
    .then(res => res.data)
    .then(currentCampus => {
      dispatch(getSingleCampus(currentCampus))
    });
  }
}

export function fetchAddCampus(newCampus) {
  return function (dispatch) {
    axios.post('/api/campuses', newCampus)
    .then(() => {
      dispatch(addCampus(newCampus));
    })
  }
}

export function fetchEditCampus(campusId, updatedCampus, history) {
  return function (dispatch) {
    console.log('Thunked, in the then');
    axios.put(`/api/campuses/${campusId}`, updatedCampus)
    .then(() => {
      dispatch(editCampus(updatedCampus))
      history.push(`/campuses/${campusId}`)
    })
  }
}

export function fetchDeleteCampus(campusId, history) {
  return function (dispatch) {
    axios.delete(`/api/campuses/${campusId}`)
    .then(() => history.push('/'))
  }
}

export function fetchAllStudents() {
  return function (dispatch) {
    axios.get('/api/students')
    .then(res => res.data)
    .then(students => {
      dispatch(getStudents(students))
    })    
  }
}

export function fetchSingleStudent(studentId) {
  return function (dispatch) {
    axios.get(`/api/students/${studentId}`)
    .then(res => res.data)
    .then(currentStudent => {
      dispatch(getSingleStudent(currentStudent))
    });
  }
}

// Reducer
export default function reducer(state = initialState, action) {
  let newState = Object.assign({}, state)
  switch (action.type) {
    case GET_CAMPUSES:
      newState.campuses = action.campuses;
      break;
    case GET_SINGLE_CAMPUS:
      newState.currentCampus = action.currentCampus;
      break;
    case ADD_CAMPUS:
      newState.campuses = [...newState.campuses, action.newCampus];
      break;
    case EDIT_CAMPUS:
      newState.currentCampus = action.updatedCampus;
      break;
    case DELETE_CAMPUS:
      newState.currentCampus = {};
      break;
    case GET_STUDENTS:
      newState.students = action.students;
      break;
    case GET_SINGLE_STUDENT:
      newState.currentStudent = action.currentStudent;
      break;
    default:
      return state;
  }
  return newState;
}