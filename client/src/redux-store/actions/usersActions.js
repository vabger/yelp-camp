import {
  LOG_IN_FAILURE,
  LOG_IN_INITIATE,
  LOG_IN_SUCCESS,
} from "../action-types/usersTypes";

import axios from "axios";
import { loadingStart, loadingStop } from "./uiActions";

export const logInUser = (info) => {
  return (dispatch, getState) => {
    dispatch(loadingStart(LOG_IN_INITIATE));
    axios
      .post(
        "http://localhost:5000/users/login",
        {
          email: info.email,
          password: info.password,
        },
        {
          withCredentials: true,
        }
      )
      .then((res) => {
        const userInfo = res.data.currentUser;
        dispatch({
          type: LOG_IN_SUCCESS,
          payload: {
            ...userInfo,
            remember: info.remember,
          },
        });
      })
      .catch((err) => {
        console.log(err);
        dispatch({
          type: LOG_IN_FAILURE,
          payload: err.response.data.error,
        });
      })
      .finally(() => {
        dispatch(loadingStop(LOG_IN_INITIATE));
      });
  };
};

export const getCurrentUser = () => {
  return async (dispatch, getState) => {
    dispatch(loadingStart(LOG_IN_INITIATE));
    try {
      const { data } = await axios.get("http://localhost:5000/users/current", {
        withCredentials: true,
      });

      const userInfo = data.currentUser;

      dispatch({
        type: LOG_IN_SUCCESS,
        payload: userInfo,
      });
    } catch (err) {
      dispatch({
        type: LOG_IN_FAILURE,
        payload: err.response.data.error,
      });
    } finally {
      dispatch(loadingStop(LOG_IN_INITIATE));
    }
  };
};
