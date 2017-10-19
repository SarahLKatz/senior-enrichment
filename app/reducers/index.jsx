import axios from 'axios';

const initialState = {
  campuses: [],
  students: [],
  currentCampus: {},
}

// Action Constants
const GET_CAMPUSES = 'GET_CAMPUSES';
const GET_SINGLE_CAMPUS = 'GET_SINGLE_CAMPUS';
const GET_STUDENTS = 'GET_STUDENTS';

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

function getStudents(students) {
  return {
    type: GET_STUDENTS,
    students
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

export function fetchAllStudents() {
  return function (dispatch) {
    axios.get('/api/students')
    .then(res => res.data)
    .then(students => {
      dispatch(getStudents(students))
    })    
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
    case GET_STUDENTS:
      newState.students = action.students;
      break;
    default:
      return state;
  }
  return newState;
}