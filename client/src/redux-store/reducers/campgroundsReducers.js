import {
  CAMPGROUNDS_SUCCESS,
  CAMPGROUNDS_FAILURE,
} from "../action-types/campgroundsTypes";

const initialCampgroundState = {
  campgrounds: [],
  page: 0,
  limit: 10,
  error: {},
};
export const campgroundsReducer = (
  prevState = initialCampgroundState,
  action
) => {
  switch (action.type) {
    case CAMPGROUNDS_SUCCESS:
      return {
        ...prevState,
        campgrounds: [...prevState.campgrounds, ...action.payload],
        page: prevState.page + 1,
        limit: 4,
        error: {},
      };
    case CAMPGROUNDS_FAILURE:
      return {
        ...prevState,
        error: action.payload,
        campgrounds: initialCampgroundState.campgrounds,
      };
    default:
      return {
        ...prevState,
      };
  }
};
