import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {FavCitiesService} from "../../../data/service/FavCitiesService";
import {PropertyService} from "../../../data/service/PropertyService";
import {PropertyMainFields} from "../../../data/model/PropertiesModel";
import {FavCitiesModel} from "../../../data/model/FavCitiesModel";

interface LandingState {
    readonly city?: string
    readonly radius?: number
    readonly cheapestProperties: PropertyMainFields[]
    readonly favCities: FavCitiesModel
}

export default function LandingScreenModel(
    favCitiesService: FavCitiesService,
    propertyService: PropertyService
) {
    const [ state, setState] = useState<LandingState>({
        city: "",
        radius: 0,
        cheapestProperties: [],
        favCities: []
    })
    const navigate = useNavigate();

    useEffect(() => {
        getCheapestProperties();
        getFavCities();
    }, []);

    function onSearchTextChange(changeEvent: React.ChangeEvent<HTMLInputElement>) {
        setState((prevState) => ({
            ...prevState,
            city: changeEvent.target.value
        }))
    }

    function onRadiusSliderChange(event: Event, newValue: number | number[]) {
        if (typeof newValue === 'number') {
            setState((prevState) => ({
                ...prevState,
                radius: newValue
            }));
        }
    }

    function onSearchClick() {
        navigate('/properties', { state: { searchInput: state.city } })
    }

    const onKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) =>{
        if( e.key === 'Enter' ){
            onSearchClick();
        }
    };

    const getFavCities = async () => {
        try {
            const favCities = await favCitiesService.getFavCities();
            if (favCities) {
                setState((prevState) => ({
                    ...prevState,
                    favCities
                }));
            }
        } catch (error) {
            console.error('Error fetching cities:', error);
            setState((prevState) => ({
                ...prevState,
                favCities: []
            }));
        }
    };

    const getCheapestProperties = async () => {
        try {
            const cheapestProperties = await propertyService.getCheapestProperties();
            if (cheapestProperties) {
                const propertyFields = await Promise.all(
                    cheapestProperties.map(property => getCheapestPropertyMainFields(property.socialMediaLink))
                )
                const validProperties = propertyFields.filter(
                    (property): property is PropertyMainFields => property !== null
                );

                setState((prevState) => ({
                    ...prevState,
                    cheapestProperties: validProperties
                }));
            }
        } catch (error) {
            console.error('Error fetching properties:', error);
            setState((prevState) => ({
                ...prevState,
                cheapestProperties: []
            }));
        }
    };

    const getCheapestPropertyMainFields = async (link: string): Promise<PropertyMainFields | null> => {
        if (link) {
            try {
                return await propertyService.getPropertyMainFields(link)
            } catch (error) {
                console.error('Error fetching properties:', error);
                return null
            }
        }
        return null
    };

    return {
        state,
        onSearchClick,
        onRadiusSliderChange,
        onSearchTextChange,
        onKeyPress
    }
}
