import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Box, Divider, IconButton, List, ListItemButton, ListItemIcon, ListItemText, Menu, MenuItem, Toolbar } from '@mui/material';
import GridViewOutlinedIcon from '@mui/icons-material/GridViewOutlined';
import FolderCopyOutlinedIcon from '@mui/icons-material/FolderCopyOutlined';
import '../../Styles/SideBar.css';
import { styled } from '@mui/material/styles';
import MuiDrawer from '@mui/material/Drawer';
import CustomizedDialogs from '../ConfirmationDialog/ConfirmationDialog';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import SailingOutlinedIcon from '@mui/icons-material/SailingOutlined';
import PhishingRoundedIcon from '@mui/icons-material/PhishingRounded';
import ArchiveIcon from '@mui/icons-material/Archive';
import VolunteerActivismIcon from '@mui/icons-material/VolunteerActivism';
import OfficeLogo from '../../Assets/city-agri-logo.png';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { PersonAdd, Logout } from '@mui/icons-material';
import CreateAccount from '../Forms/CreateAccountForm';

const SidebarItemList = (
  <>
    <Link to="/dashboard" className="nav-link">
      <ListItemButton>
        <ListItemIcon>
          <GridViewOutlinedIcon sx={{ color: 'white' }} />
        </ListItemIcon>
        <ListItemText primary="Dashboard" />
      </ListItemButton>
    </Link>
    <Link to="/fisherfolk-record" className="nav-link">
      <ListItemButton>
        <ListItemIcon>
          <FolderCopyOutlinedIcon sx={{ color: 'white' }} />
        </ListItemIcon>
        <ListItemText primary="Fisherfolk Record" />
      </ListItemButton>
    </Link>
    <Link to="/fisherfolk-boats" className="nav-link">
      <ListItemButton>
        <ListItemIcon>
          <SailingOutlinedIcon sx={{ color: 'white' }} />
        </ListItemIcon>
        <ListItemText primary="Boat Record" />
      </ListItemButton>
    </Link>
    <Link to="/fisherfolk-gears" className="nav-link">
      <ListItemButton>
        <ListItemIcon>
          <PhishingRoundedIcon sx={{ color: 'white' }} />
        </ListItemIcon>
        <ListItemText primary="Gear Record" />
      </ListItemButton>
    </Link>
    <Link to="/fisherfolk-programs" className="nav-link">
      <ListItemButton>
        <ListItemIcon>
          <VolunteerActivismIcon sx={{ color: 'white' }} />
        </ListItemIcon>
        <ListItemText primary="Fisherfolk Program" />
      </ListItemButton>
    </Link>
  </>
);

const drawerWidth = 180;

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  '& .MuiDrawer-paper': {
    position: 'relative',
    width: drawerWidth,
    background: 'radial-gradient(circle, rgba(40,193,129,.8) 40%, rgba(209,221,85,.7) 100%)',
    color: 'white',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    ...(!open && {
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      width: theme.spacing(8),
    }),
  },
}));

function Sidebar() {
  const [openDrawer, setOpenDrawer] = useState(true);
  const navigate = useNavigate();

  const toggleDrawer = () => {
    setOpenDrawer(!openDrawer);
  };
  const [open, setOpen] = useState(false);
  const [openAddAccount, setOpenAddAccount] = useState(false);
  const [openLogout, setOpenLogout] = useState(false);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const openAcc = Boolean(anchorEl);

  const handleOpenAccSetting = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpenAddAccount = () => {
    setOpenAddAccount(true);
  };

  const handleCloseAddAccount = () => {
    setOpenAddAccount(false);
  };

  const handleOpenLogout = () => {
    setOpenLogout(true);
  };

  const handleCloseLogout = () => {
    setOpenLogout(false);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <>
      <Drawer variant="permanent" open={openDrawer}>
        <Toolbar
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-end',
            px: [1],
          }}
        >
          <IconButton onClick={toggleDrawer}>
            <ChevronLeftIcon sx={{ color: 'white' }} />
          </IconButton>
        </Toolbar>
        <Divider />
        <Link to="/dashboard" className="nav-link">
          <Box
            component="img"
            sx={{
              height: openDrawer ? 100 : 40,
              width: openDrawer ? 100 : 40,
              marginLeft: openDrawer ? 5 : 1.22,
              marginTop: 2,
              borderRadius: 15,
            }}
            src={OfficeLogo}
          />
        </Link>
        <List component="nav" style={{ height: '100%' }}>
          {SidebarItemList}
        </List>
        <Link to="/fisherfolk-archive" className="nav-link">
          <ListItemButton sx={{ position: 'absolute', bottom: 50, width: '100%' }}>
            <ListItemIcon>
              <ArchiveIcon sx={{ color: 'white' }} />
            </ListItemIcon>
            <ListItemText primary="Archived Record" />
          </ListItemButton>
        </Link>
        <ListItemButton onClick={handleOpen} sx={{ position: 'absolute', bottom: 3, width: '100%' }}>
          <ListItemIcon>
            <IconButton onClick={handleOpenAccSetting} size="small" sx={{ ml: 2 }} aria-controls={openAcc ? 'account-menu' : undefined} aria-haspopup="true" aria-expanded={openAcc ? 'true' : undefined}>
              <AccountCircleIcon style={{ color: 'white', marginLeft: -21 }} />
            </IconButton>
          </ListItemIcon>
          <ListItemText primary="Account" />
        </ListItemButton>
      </Drawer>
      <Menu anchorEl={anchorEl} id="account-menu" open={open} onClose={handleClose}>
        <MenuItem onClick={handleOpenAddAccount}>
          <ListItemIcon>
            <PersonAdd fontSize="small" />
          </ListItemIcon>
          Add account
        </MenuItem>
        {openAddAccount && <CreateAccount handleClose={handleCloseAddAccount} open={openAddAccount} />}
        <MenuItem onClick={handleOpenLogout}>
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          Logout
        </MenuItem>
        {openLogout && <CustomizedDialogs open={openLogout} handleClose={handleCloseLogout} handleLogout={handleLogout} title="Logout" message="Are you sure you want to logout?" leftBtnMsg="Cancel" rightBtnMsg="Logout" />}
      </Menu>
    </>
  );
}

export default Sidebar;
