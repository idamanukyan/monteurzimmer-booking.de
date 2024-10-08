import axios, { AxiosResponse } from "../../../node_modules/axios/index"
import {PropertiesModel} from "../model/PropertiesModel";

const API_URL = 'http://localhost:8080/api/properties';

export class PropertyService {
    getProperties = async (city: string) : Promise<PropertiesModel | null> => {
        try {
            const response: AxiosResponse = await axios.get(API_URL + '/city/' + city);
            const properties: PropertiesModel = response.data
            console.log(properties)
            return properties;
        } catch (error) {
            console.error('Error fetching feeds:', error);
            return null;
        }
    };
}