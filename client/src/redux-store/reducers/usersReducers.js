import {
  LOG_IN_FAILURE,
  LOG_IN_SUCCESS,
  CLEAR_USER_ERRORS,
} from "../action-types/usersTypes";

const initialState = {
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
        error: undefined,
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
    case CLEAR_USER_ERRORS: return {
      ...prevState,
      error: undefined
    }
    default:
      return prevState;
  }
};
