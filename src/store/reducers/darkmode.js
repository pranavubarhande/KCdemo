import { createSlice } from "@reduxjs/toolkit";

const darkModeSlice = createSlice({
  name: "darkmode",
  initialState: false,
  reducers: {
    invert: (state) => !state
  },
});

export const { invert } = darkModeSlice.actions;
export default darkModeSlice.reducer;
