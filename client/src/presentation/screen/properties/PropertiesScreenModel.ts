import {useLocation, useNavigate} from 'react-router-dom';
import {useEffect, useState} from "react";
import {PropertyService} from "../../../data/service/PropertyService";
import {Property} from "../../../data/model/PropertiesModel";

interface PropertiesState {
    city: string;
    properties: Property[] | null;
}

export default function PropertiesScreenModel(propertyService: PropertyService) {
    const location = useLocation();
    const [state, setState] = useState<PropertiesState>({
        city: location.state?.searchInput || "",
        properties: [] || null
    });

    const navigate = useNavigate();
    // console.log(state.city)

    const getProperties = async () => {
        if (state.city) {
            try {
                const properties = await propertyService.getProperties(state.city);
                // console.log('Properties List: '+properties)
                // console.log(state.city)

                setState((prevState) => ({
                    ...prevState,
                    properties
                }));
            } catch (error) {
                console.error('Error fetching properties:', error);
                setState((prevState) => ({
                    ...prevState,
                    properties: []
                }));
            }
        }
    };

    useEffect(() => {
        getProperties()
    }, [state.city]);

    return {
        state, setState
    };
}
