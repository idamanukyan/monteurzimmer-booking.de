export type PropertiesModel = Property[]

export interface Property {
    propertyName: string
    propertyType: string
    description: string
    address: string
    pricePerNight: number
    fullPrice: number
    pricePerBed: number
    rating: number
    city: City
    roomCount: number
    bedCount: number
    numberOfGuests: number
    socialMediaLink: string
    wifi: boolean
    tv: boolean
    separateBeds: boolean
    privateBath: boolean
    cookingFacilities: boolean
    radio: boolean
    towels: boolean
    extraBedPossible: boolean
    bedLinen: boolean
    fridge: boolean
    coffeeMachine: boolean
    microwave: boolean
    dishwasher: boolean
    wc: boolean
    terrace: boolean
    kettle: boolean
    bathtub: boolean
    garden: boolean
    cookingUtensils: boolean
    washingMachine: boolean
    selfCheckIn: boolean
    smoking: boolean
    quietLocation: boolean
    goodTransportation: boolean
    shopsNearby: boolean
    neighborhood: string
    bathrooms: number
    latitude: number
    longitude: number
    isFavorite: boolean
    photos: string
    distance: number
    maxPrice: number
    minPrice: number
    price: number
}

export interface City {
    id: number
    name: string
    isFavorite: boolean
    photo: string
    longitude: number
    latitude: number
}

export interface PropertyMainFields {
    title: string
    description: string
    image: string
}