import axios, { AxiosResponse } from "../../../node_modules/axios/index"
import {PropertiesModel, PropertyMainFields} from "../model/PropertiesModel";

const api_url_main = 'http://localhost:8080/api/properties';

const api_url_link_preview = 'https://fetchlinkapi-production.up.railway.app/link-preview?api_key='; // Use the new URL for the link preview API
const apiKey = '8c3ede4e-66c1-4da7-841f-795b75bb5e2c'; // Updated API key

export class PropertyService {
    getProperties = async (city: string) : Promise<PropertiesModel | null> => {
        try {
            const response: AxiosResponse = await axios.get(api_url_main + '/city/' + city)
            const properties: PropertiesModel = response.data
            return properties
        } catch (error) {
            console.error('Error fetching feeds:', error)
            return null
        }
    }

    getPropertyMainFields = async (link: string) : Promise<PropertyMainFields | null> => {
        try {
            const response: AxiosResponse = await axios.get(`${api_url_link_preview}${apiKey}&url=${encodeURIComponent(link)}`);
            const propertyMainFields: PropertyMainFields = response.data
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
            return properties
        } catch (error) {
            console.error('Error fetching feeds:', error)
            return null
        }
    }
}