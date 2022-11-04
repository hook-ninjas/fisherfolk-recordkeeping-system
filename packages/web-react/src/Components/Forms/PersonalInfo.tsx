import React, { } from 'react';
import { Avatar, IconButton, InputAdornment, ListItemButton, ListItemIcon, ListItemText, Dialog } from '@mui/material';
import Box from '@mui/material/Box';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import TextField from '@mui/material/TextField';
import CustomForm from './popUp'
import CloseIcon from '@mui/icons-material/Close';
import AddIcon from '@mui/icons-material/Add';
import { styled } from '@mui/material/styles';
interface FormInputProps {
    handleClickOpen: () => void;
    handleClose: () => void;
    open: boolean;
}
export interface DialogTitleProps {
    id: string;
    children?: React.ReactNode;
    onClose: () => void;
}



const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
        padding: theme.spacing(6),
    },
    '& .MuiDialogActions-root': {
        padding: theme.spacing(1),
    },
}));

function FormInput(props: FormInputProps) {
    const [open, setOpen] = React.useState(false);
    const handleClose = () => {
        setOpen(false);
    };
    const handleClickOpen = () => {
        setOpen(true);
    };
    return (

        <>

            <ListItemButton
                onClick={handleClickOpen}
                sx={{ position: 'absolute', bottom: 3 }}
            >
                <ListItemIcon>
                    <AddIcon />
                </ListItemIcon>
                <ListItemText primary="Add" />
            </ListItemButton>
            <BootstrapDialog
                onClose={close}
                aria-labelledby="customized-dialog-title"
                open={open}>
                <div>
                    <Box sx={{
                        display: 'flex',
                        justifyContent: 'flex-end'
                    }}>
                        <ListItemButton
                            onClick={handleClose}
                            sx={{ position: 'absolute', justifyContent: 'center' }}
                        >
                            <IconButton  >
                                <CloseIcon />
                            </IconButton>
                            <ListItemText primary="close" />
                        </ListItemButton>
                    </Box>
                </div>
                <div >
                <Box
                    sx={{
                        display: 'flex-ccenter',
                        justifyContent: 'flex-center',
                        my: -5,
                        bgcolor: 'background.paper',


                    }}>
                    <text><h1>Personal Information</h1></text>
                    </Box>
                </div>

                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'flex-end',
                        my: -5,
                        bgcolor: 'background.paper',


                    }}
                >
                    {/* <Avatar
                        variant="square"
                        alt="GeeksforGeeks"
                        sx={{ width: 100, height: 100 }}
                        src=
                        'https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.freeiconspng.com%2Fimages%2Fprofile-icon-png&psig=AOvVaw1FG3hzSAyC3AWPEBEpfDZr&ust=1667415379617000&source=images&cd=vfe&ved=0CAwQjRxqFwoTCKjOtbzUjfsCFQAAAAAdAAAAABAEhttps://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.flaticon.com%2Ffree-icon%2Fprofile_3135715&psig=AOvVaw1FG3hzSAyC3AWPEBEpfDZr&ust=1667415379617000&source=images&cd=vfe&ved=0CAwQjRxqFwoTCKjOtbzUjfsCFQAAAAAdAAAAABAO'
                    /> */}

                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'flex-end', pt: 5 }}>

                </Box>
                <Box component="form"
                    sx={{
                        '& .MuiTextField-root': { m: 1.5, width: '25ch' },
                    }}
                    noValidate
                    autoComplete="off">

                    <div>

                        <Box sx={{
                            display: 'flex',
                            py: 0,
                            bgcolor: 'background.paper',
                            borderRadius: 1,
                        }}>

                            <FormControlLabel control={<Checkbox defaultChecked />} label="Mr" />
                            <FormControlLabel control={<Checkbox defaultChecked />} label="Ms" />
                            <FormControlLabel control={<Checkbox defaultChecked />} label="Mrs" />
                        </Box>
                        <Box sx={{
                            display: 'flex',



                        }}>

                            <FormControlLabel control={<Checkbox defaultChecked />} label="New Registration" />
                            <FormControlLabel control={<Checkbox defaultChecked />} label="Renewal" />
                        </Box>
                        <Box>
                            <TextField
                                label="Last Name"
                                id="outlined-start-adornment"
                                sx={{ m: 1, width: '25ch' }}
                                InputProps={{
                                    startAdornment: <InputAdornment position="start"></InputAdornment>,
                                }}
                            />
                            <TextField
                                label="First Name"
                                id="outlined-start-adornment"
                                sx={{ width: '25', maxWidth: '50%' }}
                                InputProps={{
                                    startAdornment: <InputAdornment position="start"></InputAdornment>,
                                }}
                            />
                            <TextField
                                label="Middle Name"
                                id="outlined-start-adornment"
                                sx={{ m: 1, width: '25ch' }}
                                InputProps={{
                                    startAdornment: <InputAdornment position="start"></InputAdornment>,
                                }}
                            />


                            <TextField
                                label="Street/Branangay"
                                id="outlined-start-adornment"
                                sx={{ width: '25', maxWidth: '50%' }}
                                InputProps={{
                                    startAdornment: <InputAdornment position="start"></InputAdornment>,
                                }}
                            />
                            <TextField
                                label="City/Municipality"
                                id="outlined-start-adornment"
                                sx={{ m: 1, width: '25ch' }}
                                InputProps={{
                                    startAdornment: <InputAdornment position="start"></InputAdornment>,
                                }}
                            />
                            <TextField
                                label="Province"
                                id="outlined-start-adornment"
                                sx={{ width: '25', maxWidth: '50%' }}
                                InputProps={{
                                    startAdornment: <InputAdornment position="start"></InputAdornment>,
                                }}
                            />
                            <TextField
                                label="Contact Number"
                                id="outlined-start-adornment"
                                sx={{ m: 1, width: '25ch' }}
                                InputProps={{
                                    startAdornment: <InputAdornment position="start"></InputAdornment>,
                                }}
                            />

                            <TextField
                                label="Resident of the Municipality since"
                                id="outlined-start-adornment"
                                sx={{ m: 1, width: '25ch' }}
                                InputProps={{
                                    startAdornment: <InputAdornment position="start"></InputAdornment>,
                                }}
                            />
                            <TextField
                                label="Religion"
                                id="outlined-start-adornment"
                                sx={{ m: 1, width: '25ch' }}
                                InputProps={{
                                    startAdornment: <InputAdornment position="start"></InputAdornment>,
                                }}
                            />
                            <TextField
                                label="Date of Birth"
                                id="outlined-start-adornment"
                                sx={{ width: '25', maxWidth: '50%' }}
                                InputProps={{
                                    startAdornment: <InputAdornment position="start"></InputAdornment>,
                                }}
                            />
                            <TextField
                                label="PLace Of Birth"
                                id="outlined-start-adornment"
                                sx={{ width: '25', maxWidth: '50%' }}
                                InputProps={{
                                    startAdornment: <InputAdornment position="start"></InputAdornment>,
                                }}
                            />
                            <TextField
                                label="No. of Children"
                                id="outlined-start-adornment"
                                sx={{ width: '25', maxWidth: '15%' }}
                                InputProps={{
                                    startAdornment: <InputAdornment position="start"></InputAdornment>,
                                }}
                            />
                            <TextField
                                label="Age"
                                id="outlined-start-adornment"
                                sx={{ width: '25', maxWidth: '15%' }}
                                InputProps={{
                                    startAdornment: <InputAdornment position="start"></InputAdornment>,
                                }}
                            />
                        </Box>
                    </div>

                </Box>

            </BootstrapDialog>
        </>

    );
}

export default FormInput;


