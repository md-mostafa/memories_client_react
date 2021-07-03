import { AUTH } from '../constants/actionTypes';
import * as api from '../api/index.js';


//if action creator are asynchronous  then we have to use redux thunk
export const signin = (formData, router) => async (dispatch) => {
  try {
    //log in the user..
    const { data } = await api.signIn(formData);

    dispatch({ type: AUTH, data });  //this is reduces

    router.push('/');
  } catch (error) {
    console.log(error);
  }
};

export const signup = (formData, router) => async (dispatch) => {
  try {
    //sign up the user..
    const { data } = await api.signUp(formData);

    dispatch({ type: AUTH, data }); //this is reducer

    router.push('/');
  } catch (error) {
    console.log(error);
  }
};

/*

import { AUTH } from '../constants/actionTypes';
import * as api from '../api/index.js';


//if action creator are asynchronous  then we have to use redux thunk

export const signin = (formData, history) => async (dispatch) => {
    try {
        //log in the user..
        const { data } = await api.signIn(formData);

        dispatch({ type: AUTH, data}); //this is reduces

        history.push('/')
    } catch(error) {
        console.log(error);
    }
};


export const signup = (formData, history) => async (dispatch) => {
    try {
        //sign up the user..
        const { data } = await api.signUp(formData);

        dispatch({ type: AUTH, data}); //this is reduces

        history.push('/')
    } catch(error) {
        console.log(error);
    }
};



*/