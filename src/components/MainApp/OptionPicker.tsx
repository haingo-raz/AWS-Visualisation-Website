import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './OptionPicker.scss';
import { Box, InputLabel, MenuItem, FormControl, Select, SelectChangeEvent}  from '@mui/material';
import Visualisation from './Visualisation'; //test
import Prediction from './Prediction'; //test

function OptionPicker() {
    
    const [option, setOption] = useState('');

    //let navigate = useNavigate();

    //Interaction with the select input 
    const handleChange = (event: SelectChangeEvent) => { 
        setOption(event.target.value as string);
        
        //navigate(`${option}`);
        //setOption('');
    };

    const optionsList = [
        {
            name: 'Los Angeles Lakers', 
            value: 'lakers',
            path: '/lakers'
        },
        {
            name: 'Chicago Bulls', 
            value: 'bulls', 
            path: '/bulls'
        },
        {
            name: 'Houston Rockets',
            value: 'rockets',
            path: '/rockets'
        },
        {
            name: 'Golden State Warriors',
            value: 'warriors', 
            path: '/warriors'
        },
        {
            name: 'Boston Celtics',
            value: 'celtics', 
            path: '/celtics'
            
        },
        {
            name: 'All teams',
            value: 'allTeams', 
            path: '/'
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
                    optionsList.map((item) => 
                        <MenuItem 
                            component={Link}
                            to={item.path}
                        >
                            {item.name}
                        </MenuItem>
                    )
                }
                </Select> 
            </FormControl>
            <span>{option}</span>
        </div>
    );
}

export default OptionPicker;