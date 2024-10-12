import {useLocation, useNavigate} from 'react-router-dom';
import {ReactEventHandler, useEffect, useState} from "react";
import {PropertyService} from "../../../data/service/PropertyService";
import {Property, PropertyMainFields} from "../../../data/model/PropertiesModel";

interface PropertiesState {
    city: string
    allProperties: Property[] | null
    filteredProperties: Property[] | null
    propertiesMainFields: PropertyMainFields[]
    wifi?: boolean
    tv?: boolean
    separateBeds?: boolean
    privateBath?: boolean
    cookingFacilities?: boolean
    radio?: boolean
    towels?: boolean
    extraBedPossible?: boolean
    bedLinen?: boolean
    fridge?: boolean
    coffeeMachine?: boolean
    microwave?: boolean
    dishwasher?: boolean
    wc?: boolean
    terrace?: boolean
    kettle?: boolean
    bathtub?: boolean
    garden?: boolean
    cookingUtensils?: boolean
    washingMachine?: boolean
    selfCheckIn?: boolean
    smoking?: boolean
    quietLocation?: boolean
    goodTransportation?: boolean
    shopsNearby?: boolean
}

export default function PropertiesScreenModel(propertyService: PropertyService) {
    const location = useLocation();
    const [state, setState] = useState<PropertiesState>({
        city: location.state?.searchInput || "",
        allProperties: [] || null,
        filteredProperties: [] || null,
        propertiesMainFields: []
    });

    const navigate = useNavigate();

    const getProperties = async () => {
        if (state.city) {
            try {
                const allProperties = await propertyService.getProperties(state.city);
                const filteredProperties = allProperties;
                setState((prevState) => ({
                    ...prevState,
                    allProperties,
                    filteredProperties
                }));
            } catch (error) {
                console.error('Error fetching properties:', error);
                setState((prevState) => ({
                    ...prevState,
                    allProperties: [],
                    filteredProperties: []
                }));
            }
        }
    };

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

    const onCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, checked } = event.target;
        setState((prevState) => ({
            ...prevState,
            [name]: checked
        }));

        setState((prevState) => {
            const updatedState = { ...prevState, [name]: checked };
            const filteredProperties = updatedState.allProperties?.filter((property) => {
                let matchesAllFilters = true;
                Object.keys(updatedState).forEach((key) => {
                    if (key in property && updatedState[key as keyof PropertiesState] === true) {
                        const propertyField = property[key as keyof Property] as boolean;
                        if (!propertyField) {
                            matchesAllFilters = false;
                        }
                    }
                });
                return matchesAllFilters;
            });

            return {
                ...updatedState,
                filteredProperties: filteredProperties || prevState.allProperties
            };
        });
    }

    useEffect(() => {
        getProperties()
    }, [state.city]);

    useEffect(() => {
        state.allProperties?.map(property => {
             getPropertyMainFields(property.socialMediaLink)
        })
    }, [state.allProperties]);

    useEffect(() => {
        if (state.propertiesMainFields?.length) {
            console.log("Updated propertiesMainFields: ", state.propertiesMainFields);
            console.log("First field: ", state.propertiesMainFields[0]);
        }
    }, [state.propertiesMainFields]);

    useEffect(() => {
        console.log(state)
        window.scrollTo(0, 0);
    }, [state]);

    return {
        state,
        setState,
        onCheckboxChange
    };
}
