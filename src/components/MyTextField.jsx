import { TextField } from '@mui/material';

const MyTextField = (isDisabled) => {
    return <TextField fullWidth disabled={isDisabled} />;
};

export default MyTextField;
