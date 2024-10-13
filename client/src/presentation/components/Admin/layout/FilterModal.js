import React from 'react';
import './style/FilterModal.css';

// Importing all icons dynamically
import wifiIcon from '../pages/style/public/searchIcons/wifi.svg';
import tvIcon from '../pages/style/public/searchIcons/tv.svg';
import privateBath from '../pages/style/public/searchIcons/privateBath.svg';
import cookingFacilities from '../pages/style/public/searchIcons/cookingFacilities.svg';
import separateBeds from '../pages/style/public/searchIcons/separateBeds.svg';
import radio from '../pages/style/public/searchIcons/radio.svg';
import towels from '../pages/style/public/searchIcons/towel.svg';
import fridge from '../pages/style/public/searchIcons/fridge.svg';
import coffeeMachine from '../pages/style/public/searchIcons/coffeeMachine.svg';
import microwave from '../pages/style/public/searchIcons/microwave.svg';
import dishwasher from '../pages/style/public/searchIcons/dishwasher.svg';
import wc from '../pages/style/public/searchIcons/wc.svg';
import terrace from '../pages/style/public/searchIcons/terrace.svg';
import kettle from '../pages/style/public/searchIcons/kettle.svg';
import bathtub from '../pages/style/public/searchIcons/bathtub.svg';
import garden from '../pages/style/public/searchIcons/garden.svg';
import cookingUtensils from '../pages/style/public/searchIcons/cookingUtensils.svg';
import washingMachine from '../pages/style/public/searchIcons/washingMachine.svg';
import smoking from '../pages/style/public/searchIcons/smoking.svg';
import quietLocation from '../pages/style/public/searchIcons/quietLocation.svg';
import goodTransportation from '../pages/style/public/searchIcons/goodTransportation.svg';
import shopsNearby from '../pages/style/public/searchIcons/shopsNearby.svg';

// Icon array for easier mapping
const icons = [
    { name: 'wifi', icon: wifiIcon },
    { name: 'tv', icon: tvIcon },
    { name: 'privateBath', icon: privateBath },
    { name: 'cookingFacilities', icon: cookingFacilities },
    { name: 'separateBeds', icon: separateBeds },
    { name: 'radio', icon: radio },
    { name: 'towels', icon: towels },
    { name: 'fridge', icon: fridge },
    { name: 'coffeeMachine', icon: coffeeMachine },
    { name: 'microwave', icon: microwave },
    { name: 'dishwasher', icon: dishwasher },
    { name: 'wc', icon: wc },
    { name: 'terrace', icon: terrace },
    { name: 'kettle', icon: kettle },
    { name: 'bathtub', icon: bathtub },
    { name: 'garden', icon: garden },
    { name: 'cookingUtensils', icon: cookingUtensils },
    { name: 'washingMachine', icon: washingMachine },
    { name: 'smoking', icon: smoking },
    { name: 'quietLocation', icon: quietLocation },
    { name: 'goodTransportation', icon: goodTransportation },
    { name: 'shopsNearby', icon: shopsNearby },
];

// Reusable IconWrapper component
const IconWrapper = ({ name, icon, isActive, onToggle }) => (
    <div
        className={`icon-wrapper ${isActive ? 'active' : ''}`}
        onClick={() => onToggle(name)}
        style={{ backgroundImage: `url(${icon})` }}
    />
);

const FilterModal = ({ isOpen, onClose, filters, setFilters }) => {
    if (!isOpen) return null;

    const handleIconToggle = (name) => {
        setFilters((prevState) => ({
            ...prevState,
            [name]: !prevState[name],
        }));
    };

    const handleApplyFilters = () => {
        onClose(); // Close the modal
    };

    const resetFilters = () => {
        const resetState = Object.keys(filters).reduce((acc, key) => {
            acc[key] = false;
            return acc;
        }, {});
        setFilters(resetState);
    };

    const closeWithoutApplying = () => {
        onClose(); // Just close the modal without applying any changes
    };

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <h2>Filtereigenschaften</h2>
                    <div className="icon-grid">
                        {icons.map(({ name, icon }) => (
                            <IconWrapper
                                key={name}
                                name={name}
                                icon={icon}
                                isActive={filters[name]}
                                onToggle={handleIconToggle}
                            />
                        ))}
                    </div>

                <div className="modal-buttons">
                    {/* Cancel Filters button */}
                    <button onClick={resetFilters}>Filter Zurücksetzen</button>
                    {/* Close Modal button */}
                    <button onClick={closeWithoutApplying}>Schließen</button>
                    {/* Apply Filters button */}
                    <button onClick={handleApplyFilters}>Filter Anwenden</button>
                </div>
            </div>
        </div>
    );
};

export default FilterModal;
