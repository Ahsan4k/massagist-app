import {createSlice} from '@reduxjs/toolkit';

const bookingSlice = createSlice({
  name: 'bookings',
  initialState: {
    bookings: []
  },
  reducers: {
    saveBookings: (state, action) => {
      state.bookings = action.payload;
    },
  },
});

export const {saveBookings} = bookingSlice.actions;

export default bookingSlice.reducer;
