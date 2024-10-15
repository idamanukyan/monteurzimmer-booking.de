import axios, { AxiosResponse } from "../../../node_modules/axios/index"
import {PropertiesModel, PropertyMainFields} from "../model/PropertiesModel";

const api_url_main = 'http://localhost:8080/api/properties';
const api_url_link_preview = 'https://api.linkpreview.net/?key='
const apiKey = '8896ff78dcac79066cbd0bebc5dc2645';
//const apiKey = '41ef05896abe124c64fce7d10447a2a5';
//const apiKey = '3d1b63b63ac0aee4fefe3a828b181a9f';
//const apiKey = '1c285900f108b0c13f2ca9cc99c99ff0';
//const apiKey = 'd4ab2b77250129d32f65e75989eb6066';

export class PropertyService {
    getProperties = async (city: string) : Promise<PropertiesModel | null> => {
        try {
            const response: AxiosResponse = await axios.get(api_url_main + '/city/' + city)
            const properties: PropertiesModel = response.data
            console.log(properties)
            return properties
        } catch (error) {
            console.error('Error fetching feeds:', error)
            return null
        }
    }

    getPropertyMainFields = async (link: string) : Promise<PropertyMainFields | null> => {
        try {
            const response : AxiosResponse = await axios.get(api_url_link_preview + apiKey + '&q=' + link)
            const propertyMainFields: PropertyMainFields = response.data
            console.log(propertyMainFields)
            return propertyMainFields
        } catch (error) {
            console.error('Error fetching feeds:', error)
            return null
        }
    }

    applyPropertyFilter = async (city: string) : Promise<PropertiesModel | null> => {
        try {
            const response: AxiosResponse = await axios.get(api_url_main + '/city/' + city)
            const properties: PropertiesModel = response.data
            console.log(properties)
            return properties
        } catch (error) {
            console.error('Error fetching feeds:', error)
            return null
        }
    }

    getCheapestProperties  = async () : Promise<PropertiesModel | null> => {
        try {
            const response: AxiosResponse = await axios.get(api_url_main + '/cheapest')
            const properties: PropertiesModel = response.data
            console.log(properties)
            return properties
        } catch (error) {
            console.error('Error fetching feeds:', error)
            return null
        }
    }

    getFavoriteProperties  = async () : Promise<PropertiesModel | null> => {
        try {
            const response: AxiosResponse = await axios.get(api_url_main + '/favorites')
            const properties: PropertiesModel = response.data
            console.log(properties)
            return properties
        } catch (error) {
            console.error('Error fetching feeds:', error)
            return null
        }
    }
}