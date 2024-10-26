import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './style/AddPropertyModal.css';
import FilterModal from './FilterModal';

const AddPropertyModal = ({ isOpen, onClose, formData, handleInputChange, resetForm }) => {
    const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
    const [filters, setFilters] = useState({});
    const [cities, setCities] = useState([]);
    const [loadingCities, setLoadingCities] = useState(true);

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

    const handleClickOutside = (e) => {
        if (e.target.className === 'modal') {
            onClose();
        }
    };

    const handleOpenFilterModal = () => setIsFilterModalOpen(true);
    const handleCloseFilterModal = () => setIsFilterModalOpen(false);

    const handleApplyFilters = (appliedFilters) => {
        setFilters(appliedFilters);
        setIsFilterModalOpen(false);
    };

    if (!isOpen) return null;

    const handleAddProperty = async (e) => {
        e.preventDefault();
        try {
            const dataToSend = {
                ...formData,
                wifi: filters.wifi || false,
                tv: filters.tv || false,
                separateBeds: filters.separateBeds || false,
                privateBath: filters.privateBath || false,
                cookingFacilities: filters.cookingFacilities || false,
                radio: filters.radio || false,
                towels: filters.towels || false,
                fridge: filters.fridge || false,
                coffeeMachine: filters.coffeeMachine || false,
                microwave: filters.microwave || false,
                dishwasher: filters.dishwasher || false,
                wc: filters.wc || false,
                terrace: filters.terrace || false,
                kettle: filters.kettle || false,
                bathtub: filters.bathtub || false,
                garden: filters.garden || false,
                cookingUtensils: filters.cookingUtensils || false,
                washingMachine: filters.washingMachine || false,
                smoking: filters.smoking || false,
                quietLocation: filters.quietLocation || false,
                goodTransportation: filters.goodTransportation || false,
                shopsNearby: filters.shopsNearby || false,
                socialMediaLink: formData.socialMediaLink || ""
            };

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
                    <input
                        type="text"
                        name="socialMediaLink"
                        placeholder="Soziale Medien"
                        value={formData.socialMediaLink}
                        onChange={handleInputChange}
                        required
                    />
                    <input
                        type="text"
                        name="propertyName"
                        placeholder="Eigenschaftsname"
                        value={formData.propertyName}
                        onChange={handleInputChange}
                        required
                    />
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
                    <textarea
                        name="description"
                        placeholder="Beschreibung"
                        value={formData.description}
                        onChange={handleInputChange}
                        required
                    />
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
                    <button type="button" onClick={handleOpenFilterModal}>Filter öffnen</button>
                    <FilterModal
                        filters={filters}
                        setFilters={setFilters}
                        isOpen={isFilterModalOpen}
                        onClose={handleCloseFilterModal}
                        onApply={handleApplyFilters}
                    />
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
