import { createSlice } from '@reduxjs/toolkit';

export const mergeSlice = createSlice({
  name: 'merge',
  initialState: {
    mainFileData: null,
    subFileData: null,
  },
  reducers: {
    updateMainFileData: (state, action) => ({
      ...state,
      mainFileData: action.payload,
    }),
    updateSubFileData: (state, action) => ({
      ...state,
      subFileData: action.payload,
    }),
  },
});
// 每个 case reducer 函数会生成对应的 Action creators
export const { updateMainFileData, updateSubFileData } = mergeSlice.actions;

export default mergeSlice.reducer;
