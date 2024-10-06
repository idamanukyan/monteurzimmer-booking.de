export type FavCitiesModel = FavCity[]

export interface FavCity {
    readonly name: string
    readonly isFavorite: boolean
    readonly photo: string
}