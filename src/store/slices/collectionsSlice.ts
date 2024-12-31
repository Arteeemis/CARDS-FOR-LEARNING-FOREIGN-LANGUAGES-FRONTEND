import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {T_Collection, T_CollectionsFilters, T_Card} from "modules/types.ts";
import {NEXT_MONTH, PREV_MONTH} from "modules/consts.ts";
import {api} from "modules/api.ts";
import {AsyncThunkConfig} from "@reduxjs/toolkit/dist/createAsyncThunk";
import {AxiosResponse} from "axios";

type T_CollectionsSlice = {
    draft_collection_id: number | null,
    cards_count: number | null,
    collection: T_Collection | null,
    collections: T_Collection[],
    filters: T_CollectionsFilters,
    save_mm: boolean
}

const initialState:T_CollectionsSlice = {
    draft_collection_id: null,
    cards_count: null,
    collection: null,
    collections: [],
    filters: {
        status: 0,
        date_formation_start: PREV_MONTH.toISOString().split('T')[0],
        date_formation_end: NEXT_MONTH.toISOString().split('T')[0]
    },
    save_mm: false
}

export const fetchCollection = createAsyncThunk<T_Collection, string, AsyncThunkConfig>(
    "collections/collection",
    async function(collection_id) {
        const response = await api.collections.collectionsRead(collection_id) as AxiosResponse<T_Collection>
        return response.data
    }
)

export const fetchDraftCollection = createAsyncThunk<T_Collection, void, AsyncThunkConfig>(
    "collections/fetch_draft_collection",
    async function(_, thunkAPI) {
        const state = thunkAPI.getState()
        const response = await api.collections.collectionsRead(state.collections.collection.id) as AxiosResponse<T_Collection>
        return response.data
    }
)

export const fetchCollections = createAsyncThunk<T_Collection[], object, AsyncThunkConfig>(
    "collections/collections",
    async function(_, thunkAPI) {
        const state = thunkAPI.getState()

        const response = await api.collections.collectionsList({
            status: state.collections.filters.status,
            date_formation_start: state.collections.filters.date_formation_start,
            date_formation_end: state.collections.filters.date_formation_end
        }) as AxiosResponse<T_Collection[]>
        return response.data
    }
)

export const removeCardFromDraftCollection = createAsyncThunk<T_Card[], string, AsyncThunkConfig>(
    "collections/remove_card",
    async function(card_id, thunkAPI) {
        const state = thunkAPI.getState()
        const response = await api.collections.collectionsDeleteCardDelete(state.collections.collection.id, card_id) as AxiosResponse<T_Card[]>
        return response.data
    }
)

export const deleteDraftCollection = createAsyncThunk<void, object, AsyncThunkConfig>(
    "collections/delete_draft_collection",
    async function(_, {getState}) {
        const state = getState()
        await api.collections.collectionsDeleteDelete(state.collections.collection.id)
    }
)

export const sendDraftCollection = createAsyncThunk<void, object, AsyncThunkConfig>(
    "collections/send_draft_collection",
    async function(_, {getState}) {
        const state = getState()
        await api.collections.collectionsUpdateStatusUserUpdate(state.collections.collection.id)
    }
)

export const updateCollection = createAsyncThunk<void, object, AsyncThunkConfig>(
    "collections/update_collection",
    async function(data, {getState}) {
        const state = getState()
        await api.collections.collectionsUpdateUpdate(state.collections.collection.id, {
            ...data
        })
    }
)

export const updateCardOrder = createAsyncThunk<void, string, AsyncThunkConfig>(
    "collections/update_mm_value",
    async function(card_id,thunkAPI) {
        const state = thunkAPI.getState()
        await api.collections.collectionsUpdateCardUpdate(state.collections.collection.id, card_id)
    }
)

const collectionsSlice = createSlice({
    name: 'collections',
    initialState: initialState,
    reducers: {
        saveCollection: (state, action) => {
            state.draft_collection_id = action.payload.draft_collection_id
            state.cards_count = action.payload.cards_count
        },
        removeCollection: (state) => {
            state.collection = null
        },
        triggerUpdateMM: (state) => {
            state.save_mm = !state.save_mm
        },
        updateFilters: (state, action) => {
            state.filters = action.payload
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchCollection.fulfilled, (state:T_CollectionsSlice, action: PayloadAction<T_Collection>) => {
            state.collection = action.payload
        });
        builder.addCase(fetchDraftCollection.fulfilled, (state:T_CollectionsSlice, action: PayloadAction<T_Collection>) => {
            state.collection = action.payload
        });
        builder.addCase(fetchCollections.fulfilled, (state:T_CollectionsSlice, action: PayloadAction<T_Collection[]>) => {
            state.collections = action.payload
        });
        builder.addCase(removeCardFromDraftCollection.rejected, (state:T_CollectionsSlice) => {
            state.collection = null
        });
        builder.addCase(removeCardFromDraftCollection.fulfilled, (state:T_CollectionsSlice, action: PayloadAction<T_Card[]>) => {
            if (state.collection) {
                state.collection.cards = action.payload as T_Card[]
            }
        });
        builder.addCase(sendDraftCollection.fulfilled, (state:T_CollectionsSlice) => {
            state.collection = null
        });
    }
})

export const { saveCollection, removeCollection, triggerUpdateMM, updateFilters } = collectionsSlice.actions;

export default collectionsSlice.reducer