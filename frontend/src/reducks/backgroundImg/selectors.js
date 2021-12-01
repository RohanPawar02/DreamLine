import { createSelector } from "reselect";

const bimgSelector = (state) => state.bimg;

export const getBimg = createSelector([bimgSelector], (state) => state.list);
