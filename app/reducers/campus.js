import axios from 'axios';

const initialState = {
  campuses: []
}

// Action Constants
export const GET_CAMPUSES = 'GET_CAMPUSES';

// Action Creators
export function getCampuses(campuses) {
  return {
    type: GET_CAMPUSES,
    campuses
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

// Reducer
export default function reducer(state = initialState, action) {
  let newState = Object.assign({}, state)
  switch (action.type) {
    case GET_CAMPUSES:
      newState.campuses = action.campuses
      break;
    default:
      return state;
  }
  return newState;
}