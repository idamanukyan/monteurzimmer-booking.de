import {useState} from "react";
import {FavCitiesService} from "../../../data/service/FavCitiesService";
import {PropService} from "../../../data/service/PropService";

interface HeaderState {
    readonly city: string
    readonly screenName: string
}

export default function HeaderModel (
    propService: PropService
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