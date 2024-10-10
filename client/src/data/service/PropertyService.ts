import axios, { AxiosResponse } from "../../../node_modules/axios/index"
import {PropertiesModel, PropertyMainFields} from "../model/PropertiesModel";

const api_url_main = 'http://localhost:8080/api/properties';
const api_url_link_preview = 'https://api.linkpreview.net/?key='
const apiKey = '4373ea0eb5df509be3677bbf53bb640c';

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
            const response = await axios.get(api_url_link_preview + apiKey + '&q=' + link)
            const propertyMainFields: PropertyMainFields = response.data
            console.log(propertyMainFields)
            return propertyMainFields
        } catch (error) {
            console.error('Error fetching feeds:', error)
            return null
        }
    }
}