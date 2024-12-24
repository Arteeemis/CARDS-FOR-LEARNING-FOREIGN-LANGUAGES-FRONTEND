import {createSlice} from "@reduxjs/toolkit";

type T_CardsSlice = {
    card_name: string
}

const initialState:T_CardsSlice = {
    card_name: "",
}


const cardsSlice = createSlice({
    name: 'cards',
    initialState: initialState,
    reducers: {
        updateCardName: (state, action) => {
            state.card_name = action.payload
        }
    }
})

export const { updateCardName} = cardsSlice.actions;

export default cardsSlice.reducer