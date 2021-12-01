import * as Actions from "./actions";
import initialState from "../store/initialState";

export const BimgReducer = (state = initialState.bimg, action) => {
  switch (action.type) {
    case Actions.FETCH_BIMG:
      return {
        ...state,
        list: action.payload,
      };
    default:
      return state;
  }
};
