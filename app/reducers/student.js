import axios from 'axios';

const initialState = {
  students: []
}

// Action Constants
export const GET_STUDENTS = 'GET_STUDENTS';

// Action Creators
export function getStudents(students) {
  console.log('creating me an action!')
  return {
    type: GET_STUDENTS,
    students
  }
}

// Thunks
export function fetchAllStudents() {
  console.log('make me a thunk')
  return function (dispatch) {
    console.log('thunk')
    axios.get('/api/students')
    .then(res => res.data)
    .then(students => {
      console.log('about to dispatch')
      dispatch(getStudents(students))
    })    
  }
}

// Reducer
export default function reducer(state = initialState, action) {
  console.log('reduce that!')
  let newState = Object.assign({}, state)
  switch (action.type) {
    case GET_STUDENTS:
      newState.students = action.students
      break;
    default:
      return state;
  }
  return newState;
}