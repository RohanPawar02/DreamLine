import API from "../../API";
import { fetchBimgAction } from "./actions";

const api = new API();

export const fetchBimg = () => {
  return async (dispatch) => {
    return api
      .getBackgroundImg()
      .then((bimg) => {
        dispatch(fetchBimgAction(bimg));
      })
      .catch((error) => {
        alert("Failed to connect API: /backgroundimages/");
        console.log(error);
      });
  };
};
