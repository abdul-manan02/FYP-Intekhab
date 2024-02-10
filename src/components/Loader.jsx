import { CircularProgress } from '@mui/material';

import React from 'react';

const Loader = ({ className }) => {
    return (
        <div className={`${className} flex items-center justify-center`}>
            <CircularProgress
                size={30}
                style={{
                    color: '#541554',
                }}
            />
        </div>
    );
};

export default Loader;
