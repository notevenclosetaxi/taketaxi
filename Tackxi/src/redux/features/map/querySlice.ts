import { createSlice } from '@reduxjs/toolkit';

const querySlice = createSlice({
  name: 'query',
  initialState: {
    startQuery: '',
    endQuery: '',
    selectQueryType: null,
  },
  reducers: {
    handleChangQuery: (state, action) => {
      const { type, text } = action.payload;
      if (type === 'startQuery') {
        state.startQuery = text;
      }
      if (type === 'endQuery') {
        state.endQuery = text;
      }
    },
    setSelectQueryType: (state, action) => {
      state.selectQueryType = action.payload;
    },
  },
});

export const { handleChangQuery, setSelectQueryType } = querySlice.actions;

export default querySlice.reducer;
