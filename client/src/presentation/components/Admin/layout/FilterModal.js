import React, {useState} from 'react';
import './style/FilterModal.css';
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
import goodTransportation from '../pages/style/public/searchIcons/quietLocation.svg';
import shopsNearby from '../pages/style/public/searchIcons/shopsNearby.svg';


const FilterModal = ({ isOpen, onClose, filters = {}, setFilters }) => {

    const initialFilterState = {
        wifi: null,
        tv: null,
        privateBath: null,
        cookingFacilities: null,
        separateBeds: null,
        radio: null,
        towels: null,
        fridge: null,
        coffeeMachine: null,
        microwave: null,
        dishwasher: null,
        wc: null,
        terrace: null,
        kettle: null,
        bathtub: null,
        garden: null,
        cookingUtensils: null,
        washingMachine: null,
        smoking: null,
        quietLocation: null,
        goodTransportation: null,
        shopsNearby: null,
    };

    const handleIconToggle = (name) => {
        setFilters((prevState) => ({
            ...prevState,
            [name]: !prevState[name],
        }));
    };

    const handleApply = () => {
        onClose();
    };

    const handleCancel = () => {
        onClose();
    };

    const handleOverlayClick = (e) => {
        // Close the modal if clicked on the overlay
        onClose();
    };


    if (!isOpen) return null;

    return (
        <div className="modal-overlay" onClick={handleOverlayClick}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <h2>Filtereigenschaften</h2>
                <form>
                    {/* Wi-Fi Icon Toggle */}
                    <div className="icon-grid">
                        <div
                            className={`icon-wrapper ${filters.wifi ? 'active' : ''}`}
                            onClick={() => handleIconToggle('wifi')}
                            style={{backgroundImage: `url(${wifiIcon})`}} // Use the icon as background
                        >
                        </div>
                        <div
                            className={`icon-wrapper ${filters.tv ? 'active' : ''}`}
                            onClick={() => handleIconToggle('tv')}
                            style={{backgroundImage: `url(${tvIcon})`}}
                        >
                        </div>
                        <div
                            className={`icon-wrapper ${filters.privateBath ? 'active' : ''}`}
                            onClick={() => handleIconToggle('privateBath')}
                            style={{backgroundImage: `url(${privateBath})`}}
                        >
                        </div>
                        <div
                            className={`icon-wrapper ${filters.cookingFacilities ? 'active' : ''}`}
                            onClick={() => handleIconToggle('cookingFacilities')}
                            style={{backgroundImage: `url(${cookingFacilities})`}}
                        >
                        </div>
                        <div
                            className={`icon-wrapper ${filters.separateBeds ? 'active' : ''}`}
                            onClick={() => handleIconToggle('separateBeds')}
                            style={{backgroundImage: `url(${separateBeds})`}}
                        >
                        </div>
                        <div
                            className={`icon-wrapper ${filters.radio ? 'active' : ''}`}
                            onClick={() => handleIconToggle('radio')}
                            style={{backgroundImage: `url(${radio})`}}
                        >
                        </div>
                        <div
                            className={`icon-wrapper ${filters.towels ? 'active' : ''}`}
                            onClick={() => handleIconToggle('towels')}
                            style={{backgroundImage: `url(${towels})`}}
                        >
                        </div>
                        <div
                            className={`icon-wrapper ${filters.fridge ? 'active' : ''}`}
                            onClick={() => handleIconToggle('fridge')}
                            style={{backgroundImage: `url(${fridge})`}}
                        >
                        </div>
                        <div
                            className={`icon-wrapper ${filters.coffeeMachine ? 'active' : ''}`}
                            onClick={() => handleIconToggle('coffeeMachine')}
                            style={{backgroundImage: `url(${coffeeMachine})`}}
                        >
                        </div>
                        <div
                            className={`icon-wrapper ${filters.microwave ? 'active' : ''}`}
                            onClick={() => handleIconToggle('microwave')}
                            style={{backgroundImage: `url(${microwave})`}}
                        >
                        </div>
                        <div
                            className={`icon-wrapper ${filters.dishwasher ? 'active' : ''}`}
                            onClick={() => handleIconToggle('dishwasher')}
                            style={{backgroundImage: `url(${dishwasher})`}}
                        >
                        </div>
                        <div
                            className={`icon-wrapper ${filters.wc ? 'active' : ''}`}
                            onClick={() => handleIconToggle('wc')}
                            style={{backgroundImage: `url(${wc})`}}
                        >
                        </div>
                        <div
                            className={`icon-wrapper ${filters.terrace ? 'active' : ''}`}
                            onClick={() => handleIconToggle('terrace')}
                            style={{backgroundImage: `url(${terrace})`}}
                        >
                        </div>
                        <div
                            className={`icon-wrapper ${filters.kettle ? 'active' : ''}`}
                            onClick={() => handleIconToggle('kettle')}
                            style={{backgroundImage: `url(${kettle})`}}
                        >
                        </div>
                        <div
                            className={`icon-wrapper ${filters.bathtub ? 'active' : ''}`}
                            onClick={() => handleIconToggle('bathtub')}
                            style={{backgroundImage: `url(${bathtub})`}}
                        >
                        </div>
                        <div
                            className={`icon-wrapper ${filters.garden ? 'active' : ''}`}
                            onClick={() => handleIconToggle('garden')}
                            style={{backgroundImage: `url(${garden})`}}
                        >
                        </div>

                        <div
                            className={`icon-wrapper ${filters.cookingUtensils ? 'active' : ''}`}
                            onClick={() => handleIconToggle('cookingUtensils')}
                            style={{backgroundImage: `url(${cookingUtensils})`}}
                        >
                        </div>

                        <div
                            className={`icon-wrapper ${filters.washingMachine ? 'active' : ''}`}
                            onClick={() => handleIconToggle('washingMachine')}
                            style={{backgroundImage: `url(${washingMachine})`}}
                        >
                        </div>
                        <div
                            className={`icon-wrapper ${filters.smoking ? 'active' : ''}`}
                            onClick={() => handleIconToggle('smoking')}
                            style={{backgroundImage: `url(${smoking})`}}
                        >
                        </div>
                        <div
                            className={`icon-wrapper ${filters.quietLocation ? 'active' : ''}`}
                            onClick={() => handleIconToggle('quietLocation')}
                            style={{backgroundImage: `url(${quietLocation})`}}
                        >
                        </div>
                        <div
                            className={`icon-wrapper ${filters.goodTransportation ? 'active' : ''}`}
                            onClick={() => handleIconToggle('goodTransportation')}
                            style={{backgroundImage: `url(${goodTransportation})`}}
                        >
                        </div>
                        <div
                            className={`icon-wrapper ${filters.shopsNearby ? 'active' : ''}`}
                            onClick={() => handleIconToggle('shopsNearby')}
                            style={{backgroundImage: `url(${shopsNearby})`}}
                        >
                        </div>
                    </div>

                </form>

                <div className="modal-buttons">
                    <button onClick={handleCancel}>Stornieren</button>
                    <button onClick={handleApply}>Filter Anwenden</button>
                </div>
            </div>
        </div>
    );
};

export default FilterModal;
