import { LOADING_START, LOADING_STOP } from "../action-types/uiActionTypes";

const initialState = {
  loader: {
    actions: [],
  },
};

export const uiReducer = (prevState = initialState, action) => {
  const prevLoaderActions = prevState.loader.actions;

  switch (action.type) {
    case LOADING_START:
      return {
        ...prevState,
        loader: {
          actions: [
            ...prevLoaderActions,
            {
              type: action.payload.name,
              params: action.payload.params,
            },
          ],
        },
      };
    case LOADING_STOP:
      return {
        ...prevState,
        loader: {
          actions: prevLoaderActions.filter((a) => {
            if (
              a.type === action.payload.name &&
              JSON.stringify(a.params) === JSON.stringify(action.payload.params)
            ) {
              return false;
            } else {
              return true;
            }
          }),
        },
      };
    default:
      return prevState;
  }
};
