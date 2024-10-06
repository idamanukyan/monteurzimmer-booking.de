import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {FavCitiesService} from "../../../data/service/FavCitiesService";

interface PropertiesState {
    readonly city: string
}

export default function PropertiesScreenModel(
    favCitiesService: FavCitiesService,
) {
    const [ state, setState] = useState<PropertiesState>({
        city: ""
    })
    const navigate = useNavigate();

    useEffect(() => {
        favCitiesService.getFavCities();
    }, []);

    function onSearchTextChange(changeEvent: React.ChangeEvent<HTMLInputElement>) {
        setState((prevState) => ({
            ...prevState,
            city: changeEvent.target.value
        }))
    }

    function onSearchClick() {
        navigate('/search', { state: { searchInput: state.city } })
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