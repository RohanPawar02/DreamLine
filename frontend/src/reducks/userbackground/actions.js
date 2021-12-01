export const FETCH_UIMAGES = "FETCH_UIMAGES";
export const fetchUimagesAction = (bimg) => {
  return {
    type: "FETCH_UIMAGES",
    payload: bimg,
  };
};
