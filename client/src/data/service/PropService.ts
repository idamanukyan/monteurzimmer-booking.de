// import axios, {AxiosResponse} from 'axios';
import {FavCitiesModel} from "../model/FavCitiesModel";

const API_URL = 'http://localhost:8080/api/cities';

export class PropService {
    getPropsByCity = async () : Promise<FavCitiesModel | Error> => {
        try {
            // const response: AxiosResponse = await axios.get(API_URL + '/properties');
            //
            // const favCities: FavCitiesModel = response.data.results
            //
            // console.log(favCities)
            //
            // return favCities;
            return new Error();
        } catch (error) {
            console.error('Error fetching feeds:', error);
            return new Error();
        }
    };
}