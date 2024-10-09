import {FavCitiesModel, FavCity} from "../model/FavCitiesModel";
import axios, { AxiosResponse } from "../../../node_modules/axios/index"

const API_URL = 'http://localhost:8080/api/cities';

export class FavCitiesService {
    getFavCities = async (): Promise<FavCitiesModel | Error> => {
        try {
            const response: AxiosResponse<FavCitiesModel> = await axios.get<FavCitiesModel>(API_URL + '/favorites');
            const favCities: FavCity[] = response.data;
            const firstCity: string = favCities[0].name;
            console.log(favCities)
            return favCities;
        } catch (error) {
            console.error('Error fetching feeds:', error);
            return new Error();
        }
    }
}