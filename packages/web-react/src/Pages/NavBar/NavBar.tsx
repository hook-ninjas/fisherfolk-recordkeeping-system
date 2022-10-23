import React from 'react';
import { Outlet } from 'react-router-dom';
import { AppBar, Toolbar, Button, Typography } from '@mui/material';

const pages = [
  { name: 'Home', href: 'home' },
  { name: 'Test', href: 'test' },
];
function NavBar() {
  const buttons = pages.map((page, index) => {
    const { name, href } = page;
    return (
      <Button
        key={index}
        variant="text"
        color="inherit"
        href={`/${href}`}
        id={`${name}-page-btn`}
      >
        <Typography sx={{ fontWeight: 'bold' }}>{name}</Typography>
      </Button>
    );
  });

  return (
    <div>
      <nav>
        <AppBar position="static" color="primary" id="appBar">
          <Toolbar>{buttons}</Toolbar>
        </AppBar>
      </nav>

      <Outlet />
    </div>
  );
}

export default NavBar;
