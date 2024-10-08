import {useState} from "react";
import {FavCitiesService} from "../../../data/service/FavCitiesService";
import {PropertyService} from "../../../data/service/PropertyService";

interface HeaderState {
    readonly city: string
    readonly screenName: string
}

export default function HeaderModel (
    propertyService: PropertyService
) {
    const [ state, setState] = useState<HeaderState>({
        city: "",
        screenName: ""
    })

    function setCity(city: string) {
        setState((prevState) => ({
            ...prevState,
            city: city
        }))
    }

    return {
        state,
        setCity
    }
}