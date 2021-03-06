import * as actionType from '../constants/actionTypes';

const authReducer = (state = { authData: null }, action) => {
  switch (action.type) {
    case actionType.AUTH:
        //console.log(action?.data);//we want to save the data to local storage because whenever i refresh the page the browser will know i am still loggedin
      localStorage.setItem('profile', JSON.stringify({ ...action?.data }));

      return { ...state, authData: action.data, loading: false, errors: null }; // => ?. optional chaining
    case actionType.LOGOUT:
      localStorage.clear();

      return { ...state, authData: null, loading: false, errors: null };
    default:
      return state;
  }
};

export default authReducer;


/*
import { AUTH, LOGOUT } from '../constants/actionTypes';


const authReducer = (state = { authData: null }, action) => {
    switch (action.type) {
        case AUTH:
            //console.log(action?.data);//we want to save the data to local storage because whenever i refresh the page the browser will know i am still loggedin
            localStorage.setItem('profile', JSON.stringify({ ...action?.data }));
            return { ...state, authData: action?.data };   // => ?. optional chaining
        case LOGOUT:
            localStorage.clear();
            return { ...state, authData: null };
        default:
            return state;
    }
};

export default authReducer;

*/