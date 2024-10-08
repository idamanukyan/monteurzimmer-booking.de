import React, {useEffect, useState} from 'react';
import axios from 'axios';
import './style/AddPropertyModal.css';
import FilterModal from "./FilterModal";

const AddPropertyModal = ({isOpen, onClose, formData, handleInputChange, handleAddProperty}) => {
    const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
    const [filters, setFilters] = useState({}); // State to hold the filters
    const [cities, setCities] = useState([]); // State to hold fetched cities
    const [loadingCities, setLoadingCities] = useState(true); // State to handle loading

    useEffect(() => {
        const fetchCities = async () => {
            try {
                const response = await axios.get('http://localhost:8080/api/cities/all'); // Fetch cities from API
                setCities(response.data); // Set cities from the API response
            } catch (error) {
                console.error('Error fetching cities:', error); // Log any errors
            } finally {
                setLoadingCities(false); // Stop loading
            }
        };

        fetchCities(); // Call the fetchCities function when the component mounts
    }, []); // Empty dependency array means this runs once when the component mounts

    if (!isOpen) return null; // If modal is not open, return null

    const handleClickOutside = (e) => {
        // If the clicked target is the modal background, close the modal
        if (e.target.className === 'modal') {
            onClose();
        }
    };

    const handleOpenFilterModal = () => {
        setIsFilterModalOpen(true); // Open filter modal
    };

    const handleCloseFilterModal = () => {
        setIsFilterModalOpen(false); // Close filter modal
    };

    // Function to apply the filters
    const handleApplyFilters = (appliedFilters) => {
        setFilters(appliedFilters); // Update filters with applied filters
        setIsFilterModalOpen(false); // Close the filter modal
    };
    return (
        <div className="modal-wrapper" onClick={handleClickOutside}>
            <div className="modal">
                <h3>Add Property</h3>
                <form onSubmit={handleAddProperty}>

                    <input
                        type="text"
                        name="socialMediaLink"
                        placeholder="Social Media Link"
                        value={formData.socialMediaLink}
                        onChange={handleInputChange}
                        required
                    />

                    <input
                        type="text"
                        name="propertyName"
                        placeholder="Property Name"
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
                        placeholder="Description"
                        value={formData.description}
                        onChange={handleInputChange}
                        required
                    />

                    <div className="input-row">
                        <input
                            type="number"
                            name="price"
                            placeholder="Price"
                            value={formData.price}
                            onChange={handleInputChange}
                            required
                        />
                        <input
                            type="number"
                            name="rating"
                            placeholder="Rating"
                            value={formData.rating}
                            onChange={handleInputChange}
                            required
                        />
                        <input
                            type="number"
                            name="roomCount"
                            placeholder="Room Count"
                            value={formData.roomCount}
                            onChange={handleInputChange}
                            required
                        />
                        <input
                            type="number"
                            name="numberOfGuests"
                            placeholder="Number of Guests"
                            value={formData.numberOfGuests}
                            onChange={handleInputChange}
                            required
                        />
                        <input
                            type="number"
                            name="bathrooms"
                            placeholder="Bathrooms"
                            value={formData.bathrooms}
                            onChange={handleInputChange}
                            required
                        />
                    </div>

                    <div className="input-row">
                        <select
                            name="city"
                            value={formData.city.name}
                            onChange={handleInputChange}
                            required
                            disabled={loadingCities} // Disable if still loading
                        >
                            <option value="">Select a City</option>
                            {loadingCities ? (
                                <option value="" disabled>Loading...</option>
                            ) : (
                                cities.map(city => (
                                    city && <option key={city.id} value={city.name}>{city.name}</option> // Add a check here
                                ))
                            )}
                        </select>
                        <input
                            type="text"
                            name="address"
                            placeholder="Address"
                            value={formData.address}
                            onChange={handleInputChange}
                            required
                        />
                    </div>

                    <button type="button" onClick={handleOpenFilterModal}>Open Filters</button>

                    {/* Pass handleApplyFilters to FilterModal */}
                    <FilterModal
                        filters={filters}
                        setFilters={setFilters}
                        isOpen={isFilterModalOpen}
                        onClose={handleCloseFilterModal}
                        onApply={handleApplyFilters} // Pass the handleApplyFilters function here
                    />

                    <div className="button-row">
                        <button type="submit">Add Property</button>
                        <button type="button" onClick={onClose}>Close</button>
                    </div>

                </form>
            </div>
        </div>
    );
};

export default AddPropertyModal;
