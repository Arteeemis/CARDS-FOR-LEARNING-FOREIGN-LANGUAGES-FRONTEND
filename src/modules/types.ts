export type T_Card = {
    id: string
    name: string
    description: string
    word_language: string
    level: string
    translate: string
    image: string
    status: number
    order?: string
}

export type T_Collection = {
    id: string | null
    status: E_CollectionStatus
    date_complete: string
    date_created: string
    date_formation: string
    owner: string
    moderator: string
    cards: T_Card[]
    name: string
    study_time: number
}

export enum E_CollectionStatus {
    Draft=1,
    InWork,
    Completed,
    Rejected,
    Deleted
}

export type T_User = {
    id: number
    username: string
    is_authenticated: boolean
}

export type T_CollectionsFilters = {
    date_formation_start: string
    date_formation_end: string
    status: number
}

export type T_CardsListResponse = {
    cards: T_Card[],
    draft_collection_id: number,
    cards_count: number
}

export type T_LoginCredentials = {
    username: string
    password: string
}

export type T_RegisterCredentials = {
    name: string
    email: string
    password: string
}