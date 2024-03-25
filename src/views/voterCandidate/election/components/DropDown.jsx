import * as React from 'react';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { useAtom } from 'jotai';
import { constituencyAtomVoterElection } from '../../../../store/admin';

export default function ConstituencyDropDownVoterElection({ data }) {
    const [selectedConstituency, setSelectedConstituency] = useAtom(constituencyAtomVoterElection);

    return (
        <Select
            displayEmpty
            placeholder="What's your favorite car?"
            IconComponent={KeyboardArrowDownIcon}
            sx={{
                width: '100%',
                background: 'white',
                '.MuiSelect-icon': {
                    transition: '0.2s',
                },
                '&.Mui-expanded .MuiSelect-icon': {
                    transform: 'rotate(-180deg)',
                },
            }}
            value={selectedConstituency}
            onChange={(e) => {
                setSelectedConstituency(e.target.value);
            }}
        >
            <MenuItem disabled value="">
                <em>None</em>
            </MenuItem>
            {data &&
                data.map((item, index) => (
                    <MenuItem key={index} value={`${item}`}>
                        {item}
                    </MenuItem>
                ))}
        </Select>
    );
}
