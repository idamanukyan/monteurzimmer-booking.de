import {useState} from "react";
import {useNavigate} from "react-router-dom";

interface LandingState {
    readonly city: string
}

export default function LandingScreenModel() {
    const [ state, setState] = useState<LandingState>({
        city: ""
    })
    const navigate = useNavigate();

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