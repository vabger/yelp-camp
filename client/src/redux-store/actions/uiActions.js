import { LOADING_START, LOADING_STOP } from "../action-types/uiActionTypes";

export const loadingStart = (name, params) => {
  return {
    type: LOADING_START,
    payload: {
      name,
      params,
    },
  };
};

export const loadingStop = (name, params) => {
  return {
    type: LOADING_STOP,
    payload: {
      name,
      params,
    },
  };
};
