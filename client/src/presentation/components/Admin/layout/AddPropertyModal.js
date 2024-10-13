import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './style/AddPropertyModal.css';
import FilterModal from './FilterModal';

const AddPropertyModal = ({isOpen, onClose, formData, handleInputChange, handleFilterResults, resetForm}) => {
    const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
    const [filters, setFilters] = useState({});
    const [cities, setCities] = useState([]);
    const [loadingCities, setLoadingCities] = useState(true);

    // Fetch the list of cities on component mount
    useEffect(() => {
        const fetchCities = async () => {
            try {
                const response = await axios.get('http://localhost:8080/api/cities/all');
                setCities(response.data);
            } catch (error) {
                console.error('Error fetching cities:', error);
            } finally {
                setLoadingCities(false);
            }
        };
        fetchCities();
    }, []);

        fetchCities();
    }, []);

    useEffect(() => {
        console.log('Filters ' + filters)
    }, [filters]);

    if (!isOpen) return null;

    const handleClickOutside = (e) => {
        if (e.target.className === 'modal') {
            onClose();
        }
    };

    // Handlers for opening/closing filter modal and applying filters
    const handleOpenFilterModal = () => setIsFilterModalOpen(true);
    const handleCloseFilterModal = () => setIsFilterModalOpen(false);
    const handleApplyFilters = (appliedFilters) => {
        setFilters(appliedFilters);
        setIsFilterModalOpen(false);
    };

    // Return null if modal is not open
    if (!isOpen) return null;


    const handleApplyFilters = (appliedFilters) => {
        setFilters(appliedFilters); // Update filters with applied filters
        setIsFilterModalOpen(false); // Close the filter modal
    };

    const handleAddProperty = async (e) => {
        e.preventDefault();
        try {
            const dataToSend = {
                ...formData,
                facilities: filters
            };
            console.log(dataToSend)
            await axios.post('http://localhost:8080/api/properties', dataToSend);
            resetForm();
        } catch (error) {
            console.error('Error adding property:', error);
        }
    };

    return (
        <div className="modal-overlay" onClick={handleClickOutside}>
            <div className="modal-content">
                <h2>Eigenschaft Hinzufügen</h2>
                <form onSubmit={handleAddProperty}>
                    {/* Social Media Link Input */}
                    <input
                        type="text"
                        name="socialMediaLink"
                        placeholder="Soziale Medien"
                        value={formData.socialMediaLink}
                        onChange={handleInputChange}
                        required
                    />

                    {/* Property Name Input */}
                    <input
                        type="text"
                        name="propertyName"
                        placeholder="Eigenschaftsname"
                        value={formData.propertyName}
                        onChange={handleInputChange}
                        required
                    />

                    {/* Property Type Select */}
                    <select
                        name="propertyType"
                        value={formData.propertyType}
                        onChange={handleInputChange}
                        required
                    >
                        <option value="">Wählen Sie einen Typ</option>
                        <option value="Gästezimmer">Gästezimmer</option>
                        <option value="Haus">Haus</option>
                        <option value="Wohnung">Wohnung</option>
                        <option value="Pension">Pension</option>
                        <option value="Herberge">Herberge</option>
                        <option value="Hotel">Hotel</option>
                        <option value="Andere">Andere</option>
                    </select>

                    {/* Description Textarea */}
                    <textarea
                        name="description"
                        placeholder="Beschreibung"
                        value={formData.description}
                        onChange={handleInputChange}
                        required
                    />

                    {/* Row for Price, Rating, Room Count, Guests, Bathrooms */}
                    <div className="input-row">
                        <input
                            type="number"
                            name="price"
                            placeholder="Preis"
                            value={formData.price}
                            onChange={handleInputChange}
                            required
                        />
                        <input
                            type="number"
                            name="rating"
                            placeholder="Bewertungen"
                            value={formData.rating}
                            onChange={handleInputChange}
                            required
                        />
                        <input
                            type="number"
                            name="roomCount"
                            placeholder="Anzahl der Zimmer"
                            value={formData.roomCount}
                            onChange={handleInputChange}
                            required
                        />
                        <input
                            type="number"
                            name="numberOfGuests"
                            placeholder="Anzahl der Gäste"
                            value={formData.numberOfGuests}
                            onChange={handleInputChange}
                            required
                        />
                        <input
                            type="number"
                            name="bathrooms"
                            placeholder="Anzahl der Badezimmer"
                            value={formData.bathrooms}
                            onChange={handleInputChange}
                            required
                        />
                    </div>

                    {/* Row for City and Address */}
                    <div className="input-row">
                        <select
                            name="city"
                            value={formData.city}
                            onChange={handleInputChange}
                            required
                            disabled={loadingCities}
                        >
                            <option value="">Wählen Sie eine Stadt</option>
                            {loadingCities ? (
                                <option value="" disabled>Loading...</option>
                            ) : (
                                cities.map(city => (
                                    city && <option key={city.id} value={city.name}>{city.name}</option>
                                ))
                            )}
                        </select>
                        <input
                            type="text"
                            name="address"
                            placeholder="Adresse"
                            value={formData.address}
                            onChange={handleInputChange}
                            required
                        />
                    </div>

                    {/* Button to open the Filter Modal */}
                    <button type="button" onClick={handleOpenFilterModal}>Filter öffnen</button>

                    {/* Filter Modal Component */}
                    <FilterModal
                        filters={filters}
                        setFilters={setFilters}
                        isOpen={isFilterModalOpen}
                        onClose={handleCloseFilterModal}
                        onApply={handleApplyFilters}
                    />

                    {/* Modal buttons for submission and close */}
                    <div className="modal-buttons">
                        <button type="submit">Eigenschaft hinzufügen</button>
                        <button type="button" onClick={onClose}>Schließen</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddPropertyModal;
