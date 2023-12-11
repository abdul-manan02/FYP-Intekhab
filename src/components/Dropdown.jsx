import * as React from 'react';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

export default function Dropdown() {
    return (
        <Select
            displayEmpty
            placeholder="What's your favorite car?"
            IconComponent={KeyboardArrowDownIcon}
            sx={{
                width: 240,
                background: 'white',
                '.MuiSelect-icon': {
                    transition: '0.2s',
                },
                '&.Mui-expanded .MuiSelect-icon': {
                    transform: 'rotate(-180deg)',
                },
            }}
        >
            <MenuItem disabled value="">
                <em>None</em>
            </MenuItem>
            <MenuItem value="jeep">Jeep</MenuItem>
            <MenuItem value="volkswagen">Volkswagen</MenuItem>
            <MenuItem value="volvo">Volvo</MenuItem>
            <MenuItem value="jaguar">Jaguar</MenuItem>
            <MenuItem value="audi">Audi</MenuItem>
        </Select>
    );
}
