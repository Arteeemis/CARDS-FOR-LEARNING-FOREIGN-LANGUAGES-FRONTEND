import {configureStore, ThunkDispatch} from "@reduxjs/toolkit";
import {TypedUseSelectorHook, useDispatch, useSelector} from "react-redux";
import userReducer from "./slices/userSlice.ts"
import collectionsReducer from "./slices/collectionsSlice.ts"
import cardsReducer from "./slices/cardsSlice.ts"

export const store = configureStore({
    reducer: {
        user: userReducer,
        collections: collectionsReducer,
        cards: cardsReducer
    }
});

export type RootState = ReturnType<typeof store.getState>
export type AppThunkDispatch = ThunkDispatch<RootState, never, never>

export const useAppDispatch = () => useDispatch<AppThunkDispatch>()
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;