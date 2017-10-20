import { combineReducers } from 'redux';

const initialState = {}

const rootReducer = function(state = initialState, action) {
  switch(action.type) {
    default: return state
  }
};

const combinedReducer = combineReducers({rootReducer})

export default combinedReducer
