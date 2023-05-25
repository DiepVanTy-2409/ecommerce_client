import React from 'react';
import Stack from '@mui/material/Stack';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const ToastMessage = ({ isOpen, setIsOpen, children, severity }) => {
    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setIsOpen(false);
    };
    return (
        <Stack spacing={2} sx={{ width: '100%' }}>
            <Snackbar
                open={isOpen}
                autoHideDuration={2000}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
            >
                <Alert onClose={handleClose} severity={severity || "success"} sx={{ width: '100%' }}>
                    {children}
                </Alert>
            </Snackbar>
        </Stack>
    )
}
export default ToastMessage