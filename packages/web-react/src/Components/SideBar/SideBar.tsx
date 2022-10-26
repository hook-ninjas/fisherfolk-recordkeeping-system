import React from 'react';
import { Link } from 'react-router-dom';
import {
  Box,
  Divider,
  IconButton,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
} from '@mui/material';
import GridViewOutlinedIcon from '@mui/icons-material/GridViewOutlined';
import FolderCopyOutlinedIcon from '@mui/icons-material/FolderCopyOutlined';
import '../../Styles/SideBar.css';
import { styled } from '@mui/material/styles';
import MuiDrawer from '@mui/material/Drawer';
import CustomizedDialogs from '../ConfirmationDialog/ConfirmationDialog';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import LogoutIcon from '@mui/icons-material/Logout';
import OfficeLogo from '../../Assets/city-agri-logo.jpg';

const SidebarItemList = (
  <>
    <Link to="/" className="nav-link">
      <ListItemButton>
        <ListItemIcon>
          <GridViewOutlinedIcon />
        </ListItemIcon>
        <ListItemText primary="Dashboard" />
      </ListItemButton>
    </Link>
    <Link to="/fisherfolk-record" className="nav-link">
      <ListItemButton>
        <ListItemIcon>
          <FolderCopyOutlinedIcon />
        </ListItemIcon>
        <ListItemText primary="Fisherfolk Record" />
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

interface SidebarProps {
  openDrawer: boolean;
  toggleDrawer: () => void;
  open: boolean;
  handleClickOpen: () => void;
  handleClose: () => void;
}

function Sidebar(props: SidebarProps) {
  const { openDrawer, toggleDrawer, open, handleClickOpen, handleClose } =
    props;

  return (
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
          <ChevronLeftIcon />
        </IconButton>
      </Toolbar>
      <Divider />
      <Link to="/" className="nav-link">
        <Box
          component="img"
          sx={{
            height: openDrawer ? 100 : 40,
            width: openDrawer ? 100 : 40,
            marginLeft: openDrawer ? 5 : 1.22,
            marginTop: 2,
          }}
          src={OfficeLogo}
        />
      </Link>
      <List component="nav" style={{ height: '100%' }}>
        {SidebarItemList}
      </List>
      <ListItemButton
        onClick={handleClickOpen}
        sx={{ position: 'absolute', bottom: 3 }}
      >
        <ListItemIcon>
          <LogoutIcon />
        </ListItemIcon>
        <ListItemText primary="Logout" />
      </ListItemButton>
      <CustomizedDialogs
        open={open}
        handleClose={handleClose}
        title="Logout"
        message="Are you sure you want to logout?"
        leftBtnMsg='Cancel'
        rightBtnMsg='Logout'
      />
    </Drawer>
  );
}

export default Sidebar;
