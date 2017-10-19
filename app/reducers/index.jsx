import { combineReducers } from 'redux';
import campuses from './campus';
import students from './student';

const initialState = {
  // campuses: [],
  // students: []
}

const rootReducer = function(state = initialState, action) {
  switch(action.type) {
    default: return state
  }
};

const combinedReducer = combineReducers({campuses, students})

export default combinedReducer
