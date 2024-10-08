import React, {ChangeEvent, useState} from 'react';
import styles from './HeroSlide.module.css';
import SearchBox from "../SearchBox/SearchBox";
import TextField from '@mui/material/TextField';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFnsV3';
import { TextFieldProps } from '@mui/material/TextField';
import { Input } from '@mui/material';
import Button from '@mui/material/Button';
import { unstable_useNumberInput as NumberInput } from '@mui/base/unstable_useNumberInput';

interface HeroSlideProps {
    onSearchClick: () => void;
    onSearchTextChange: (changeEvent: ChangeEvent<HTMLInputElement>) => void;
    onKeyPress: (e: React.KeyboardEvent<HTMLInputElement>) => void
    inputValue?: string
}

const HeroSlide: React.FC<HeroSlideProps> = ({ onSearchClick, onSearchTextChange, onKeyPress, inputValue }) => {
    const [startDate, setStartDate] = useState<Date | null>(null);
    const [endDate, setEndDate] = useState<Date | null>(null);

    return (
        <div className={styles.heroSlide}>
            <div className={styles.motto}>
                <span>Dein Partner für den besten Preis</span>
            </div>
            <div className={styles.inputFields}>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <div style={{ display: 'flex', gap: '1rem' }}>
                        <DatePicker
                            label="Start Date"
                            value={startDate}
                            onChange={(newValue) => setStartDate(newValue)}
                        />
                        <DatePicker
                            label="End Date"
                            value={endDate}
                            onChange={(newValue) => setEndDate(newValue)}
                            minDate={startDate || undefined}
                        />
                    </div>
                </LocalizationProvider>
                <Input
                    placeholder={'City Name'}
                    color={"primary"}
                    onChange={onSearchTextChange}
                />
                <Input
                    type={"number"}
                    placeholder={'Guests'}
                />
                <Button
                    variant="contained"
                    onClick={onSearchClick}
                >
                    Search
                </Button>
                {/*<SearchBox*/}
                {/*    onSearchClick={onSearchClick}*/}
                {/*    onSearchTextChange={onSearchTextChange}*/}
                {/*    onKeyPress={onKeyPress}*/}
                {/*    inputValue={inputValue}*/}
                {/*/>*/}
            </div>
        </div>
    );
};

export default HeroSlide;
