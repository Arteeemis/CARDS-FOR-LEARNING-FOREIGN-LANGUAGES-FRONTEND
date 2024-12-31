import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {T_Card, T_CardsListResponse} from "modules/types.ts";
import {AsyncThunkConfig} from "@reduxjs/toolkit/dist/createAsyncThunk";
import {api} from "modules/api.ts";
import {AxiosResponse} from "axios";
import {saveCollection} from "store/slices/collectionsSlice.ts";

type T_CardsSlice = {
    card_name: string
    card: null | T_Card
    cards: T_Card[]
}

const initialState:T_CardsSlice = {
    card_name: "",
    card: null,
    cards: []
}

export const fetchCard = createAsyncThunk<T_Card, string, AsyncThunkConfig>(
    "fetch_card",
    async function(id) {
        const response = await api.cards.cardsRead(id) as AxiosResponse<T_Card>
        return response.data
    }
)

export const fetchCards = createAsyncThunk<T_Card[], object, AsyncThunkConfig>(
    "fetch_cards",
    async function(_, thunkAPI) {
        const state = thunkAPI.getState();
        const response = await api.cards.cardsList({
            card_name: state.cards.card_name
        }) as AxiosResponse<T_CardsListResponse>

        thunkAPI.dispatch(saveCollection({
            draft_collection_id: response.data.draft_collection_id,
            cards_count: response.data.cards_count
        }))

        return response.data.cards
    }
)

export const addCardToCollection = createAsyncThunk<void, string, AsyncThunkConfig>(
    "cards/add_card_to_collection",
    async function(card_id) {
        await api.cards.cardsAddToCollectionCreate(card_id)
    }
)

const cardsSlice = createSlice({
    name: 'cards',
    initialState: initialState,
    reducers: {
        updateCardName: (state, action) => {
            state.card_name = action.payload
        },
        removeSelectedCard: (state) => {
            state.card = null
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchCards.fulfilled, (state:T_CardsSlice, action: PayloadAction<T_Card[]>) => {
            state.cards = action.payload
        });
        builder.addCase(fetchCard.fulfilled, (state:T_CardsSlice, action: PayloadAction<T_Card>) => {
            state.card = action.payload
        });
    }
})

export const { updateCardName, removeSelectedCard} = cardsSlice.actions;

export default cardsSlice.reducer