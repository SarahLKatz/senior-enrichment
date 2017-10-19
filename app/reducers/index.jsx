import { combineReducers } from 'redux';
import campuses from './campus';

const initialState = {
  campus: 'I am campus'
}

const rootReducer = function(state = initialState, action) {
  switch(action.type) {

    default: return state
  }
};

const combinedReducer = combineReducers({campuses})

export default combinedReducer
