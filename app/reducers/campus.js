import axios from 'axios';

// Action Constants
export const GET_CAMPUSES = 'GET_CAMPUSES';

// Action Creators
export function getCampuses(campuses) {
  console.log('Creating my action...')
  return {
    type: GET_CAMPUSES,
    campuses
  }
}

// Thunks
export function fetchAllCampuses() {
  console.log("I'm in the thunk...")
  return function (dispatch) {
    axios.get('/api/campuses')
    .then(res => res.data)
    .then(campuses => {
      dispatch(getCampuses(campuses))
    })    
  }
}

// Reducer
export default function reducer(state = [], action) {
  console.log("I am in the reducer!")
  let newState = Object.assign({},state)
  switch (action.type) {
    case GET_CAMPUSES:
      console.log("Gettin' me some campuses...")
      newState.campuses = action.campuses
      break;
    default:
      return state;
  }
  return newState;
}