import {useLocation, useNavigate} from 'react-router-dom';
import {useEffect, useState} from "react";
import {PropertyService} from "../../../data/service/PropertyService";
import {Property, PropertyMainFields} from "../../../data/model/PropertiesModel";

interface PropertiesState {
    city: string
    properties: Property[] | null
    propertiesMainFields: PropertyMainFields[]
}

export default function PropertiesScreenModel(propertyService: PropertyService) {
    const location = useLocation();
    const [state, setState] = useState<PropertiesState>({
        city: location.state?.searchInput || "",
        properties: [] || null,
        propertiesMainFields: []
    });

    const navigate = useNavigate();

    const getProperties = async () => {
        if (state.city) {
            try {
                const properties = await propertyService.getProperties(state.city);
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

    let propertiesMainFields : PropertyMainFields[]

    const getPropertyMainFields = async (link: string) => {
        if (link) {
            try {
                const propertyMainFields = await propertyService.getPropertyMainFields(link)
                // console.log("Property: " + propertyMainFields)
                // console.log("Property Fields: " + propertyMainFields?.description)
                // console.log("Property Fields: " + propertyMainFields?.title)
                // console.log("Property Fields: " + propertyMainFields?.image)
                if (propertyMainFields) {
                    setState((prevState) => ({
                        ...prevState,
                        propertiesMainFields: [
                            ...(prevState.propertiesMainFields || []),
                            propertyMainFields
                        ]
                    }));
                }
                // @ts-ignore
                // console.log("Property: " + state.propertiesMainFields[0])

            } catch (error) {
                console.error('Error fetching properties:', error);
            }
        }
    };

    useEffect(() => {
        getProperties()
    }, [state.city]);

    useEffect(() => {
        state.properties?.map(property => {
             getPropertyMainFields(property.socialMediaLink)
        })
    }, [state.properties]);

    useEffect(() => {
        if (state.propertiesMainFields?.length) {
            console.log("Updated propertiesMainFields: ", state.propertiesMainFields);
            console.log("First field: ", state.propertiesMainFields[0]);
        }
    }, [state.propertiesMainFields]);

    return {
        state, setState
    };
}
