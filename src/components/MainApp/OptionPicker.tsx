import React, { useState } from 'react';
import './OptionPicker.scss';
import { Box, InputLabel, MenuItem, FormControl, Select, SelectChangeEvent}  from '@mui/material';

function OptionPicker() {

    const [option, setOption] = useState('');

    const handleChange = (event: SelectChangeEvent) => {
        setOption(event.target.value as string);
    };

    const optionsList = [
        {
            name: 'Los Angeles Lakers', 
            value: 'lakers'
        },
        {
            name: 'Chicago Bulls', 
            value: 'bulls'
        },
        {
            name: 'Houston Rockets',
            value: 'rockets'
        },
        {
            name: 'Golden State Warriors',
            value: 'warriors'
        },
        {
            name: 'Boston Celtics',
            value: 'celtics'
        },
        {
            name: 'All teams',
            value: 'allTeams'
        }
    ]

    return (
        <div className="optionPicker">
            <span>Pick an option</span>
            <FormControl sx={{ mx:2, width: 250 }} size="small">
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={option}
                    onChange={handleChange}
                >
                {
                    optionsList.map((item, key) => 
                        <MenuItem value={item.value}>{item.name}</MenuItem>
                    )
                }
                </Select>
            </FormControl>
        </div>
    );
}

export default OptionPicker;