export const FETCH_BIMG = "FETCH_BIMG";
export const fetchBimgAction = (bimg) => {
  return {
    type: "FETCH_BIMG",
    payload: bimg,
  };
};
