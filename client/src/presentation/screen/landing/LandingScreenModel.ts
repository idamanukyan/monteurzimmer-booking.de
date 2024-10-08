import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {FavCitiesService} from "../../../data/service/FavCitiesService";

interface LandingState {
    readonly city: string
}

export default function LandingScreenModel(
    favCitiesService: FavCitiesService,
) {
    const [ state, setState] = useState<LandingState>({
        city: ""
    })
    const navigate = useNavigate();

    useEffect(() => {
        favCitiesService.getFavCities();
    }, []);

    useEffect(() => {
        console.log(state.city)
    }, [state.city])

    function onSearchTextChange(changeEvent: React.ChangeEvent<HTMLInputElement>) {
        setState((prevState) => ({
            ...prevState,
            city: changeEvent.target.value
        }))
    }

    function onSearchClick() {
        navigate('/properties', { state: { searchInput: state.city } })
    }

    const onKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) =>{
        if( e.key === 'Enter' ){
            onSearchClick();
        }
    };

    return {
        state,
        onSearchClick,
        onSearchTextChange,
        onKeyPress
    }
}