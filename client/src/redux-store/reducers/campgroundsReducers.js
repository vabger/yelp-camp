import {
  CAMPGROUNDS_SUCCESS,
  CAMPGROUNDS_FAILURE,
  CAMPGROUND_BY_ID_SUCCESS,
  CAMPGROUND_BY_ID_FAILURE,
} from "../action-types/campgroundsTypes";

const initialCampgroundState = {
  campgrounds: [],
  page: 0,
  limit: 10,
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
        error: undefined
      };
    case CAMPGROUNDS_FAILURE:
      return {
        ...prevState,
        error: action.payload,
        campgrounds: initialCampgroundState.campgrounds,
      };

    case CAMPGROUND_BY_ID_SUCCESS:
      return {
        ...prevState,
        error: null,
        campgroundDetails: action.payload
      };
    case CAMPGROUND_BY_ID_FAILURE:
      return {
        ...prevState,
        error: action.payload,
        campgroundDetails: null
      }

    default:
      return {
        ...prevState,
      };
  }
};
