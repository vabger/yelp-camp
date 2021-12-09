import {
  LOG_IN_FAILURE,
  LOG_IN_SUCCESS,
  CLEAR_ERRORS,
} from "../action-types/usersTypes";

const initialState = {
  error: {},
  currentUser: {
    loggedIn: false,
    info: {},
  },
};

export const usersReducer = (prevState = initialState, action) => {
  switch (action.type) {
    case LOG_IN_SUCCESS: {
      return {
        ...prevState,
        currentUser: {
          ...prevState.currentUser,
          loggedIn: true,
          info: action.payload,
        },
        error: {},
      };
    }
    case LOG_IN_FAILURE: {
      return {
        ...prevState,
        error: action.payload,
        currentUser: {
          ...prevState.currentUser,
          loggedIn: false,
          info: {},
        },
      };
    }
    case CLEAR_ERRORS: {
      return {
        ...prevState,
        error: {},
      };
    }

    default:
      return prevState;
  }
};
