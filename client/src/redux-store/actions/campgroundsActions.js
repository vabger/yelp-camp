import {
  CAMPGROUNDS_FAILURE,
  CAMPGROUNDS_FETCH,
  CAMPGROUNDS_SUCCESS,
  CAMPGROUND_BY_ID_FAILURE,
  CAMPGROUND_BY_ID_FETCH,
  CAMPGROUND_BY_ID_SUCCESS,
} from "../action-types/campgroundsTypes";

import { loadingStart, loadingStop } from "./uiActions";

import axios from "axios";

export const fetchCampgrounds = () => {
  return (dispatch, getState) => {
    const prevState = getState().campgrounds;
    const { page, limit } = prevState;


    dispatch(loadingStart(CAMPGROUNDS_FETCH));

    axios.get("http://localhost:5000/campgrounds", {
      params: {
        page: page,
        limit: limit,
      },
    }).then((res) => {
      dispatch({
        type: CAMPGROUNDS_SUCCESS,
        payload: res.data.campgrounds,
      });
    }).catch((err) => dispatch({
      type: CAMPGROUNDS_FAILURE,
      payload: err.response.data.error,
    })).finally(() => {
      dispatch(loadingStop(CAMPGROUNDS_FETCH))
    })
  }
};

export const getCampgroundById = (id) => {
  return (dispatch, getState) => {
    dispatch(loadingStart(CAMPGROUND_BY_ID_FETCH))
    axios.get(`http://localhost:5000/campgrounds/${id}`)
      .then((res) => {
        dispatch({ type: CAMPGROUND_BY_ID_SUCCESS, payload: res.data.campground })
      })
      .catch((err) => {
        dispatch({ type: CAMPGROUND_BY_ID_FAILURE, payload: err.response.data.error })
      })
      .finally(() => {
        dispatch(loadingStop(CAMPGROUND_BY_ID_FETCH))
      })
  }
}
