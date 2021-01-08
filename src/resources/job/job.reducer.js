import {
    JOB_DATA,
  } from './job.constants';
  
  export default (state = {}, action) => {
    switch (action.type) {
      case JOB_DATA:
        return {
          ...state,
          ...action.payload,
        };
      default:
        return state;
    }
  };
  