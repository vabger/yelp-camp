import {
  CAMPGROUNDS_FAILURE,
  CAMPGROUNDS_FETCH,
  CAMPGROUNDS_SUCCESS,
} from "../action-types/campgroundsTypes";

import { loadingStart, loadingStop } from "./uiActions";

import axios from "axios";

export const fetchCampgrounds = () => {
  return async (dispatch, getState) => {
    const prevState = getState().campgrounds;

    dispatch(loadingStart(CAMPGROUNDS_FETCH));
    try {
      const { page, limit } = prevState;

      const { data } = await axios.get("http://localhost:5000/campgrounds", {
        params: {
          page: page,
          limit: limit,
        },
      });

      dispatch({
        type: CAMPGROUNDS_SUCCESS,
        payload: data.campgrounds,
      });
    } catch (err) {
      dispatch({
        type: CAMPGROUNDS_FAILURE,
        payload: err.response.data.error,
      });
    } finally {
      dispatch(loadingStop(CAMPGROUNDS_FETCH));
    }
  };
};
