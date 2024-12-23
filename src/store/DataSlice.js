import { createSlice } from "@reduxjs/toolkit";

const dataSlice = createSlice({
    name: 'dataSlice',
    initialState: {
        userInfo: [],
        myMessage: [],
        currentUser : [],
    },
    reducers: {
        addUserInfo(state, action) {
            state.userInfo = action.payload;
        },
        addcurrentUser(state, action) {
            state.currentUser = action.payload;
        },
        setMyMessage(state, action) {
            state.myMessage = action.payload;
        }
    }
});

export const { addUserInfo,  addcurrentUser ,setMyMessage } = dataSlice.actions;

export default dataSlice.reducer;
