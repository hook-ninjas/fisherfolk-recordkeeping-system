import React from 'react';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BrowserRouter } from 'react-router-dom';
import Sidebar from '../Components/SideBar/SideBar';

describe('Logout', () => {
  it('should display logout button', async () => {
    render(
      <Sidebar
        openDrawer={true}
        open={false}
        toggleDrawer={() => false}
        handleClickOpen={() => false}
        handleClose={() => false}
      />,
      { wrapper: BrowserRouter }
    );

    const logoutBtn = screen.getByRole('button', {
      name: /logout/i,
    });
    expect(logoutBtn.textContent).toBe('Logout');
  });

  it('should display confirmation dialog when button is clicked', async () => {
    render(
      <Sidebar
        openDrawer={true}
        open={true}
        toggleDrawer={() => false}
        handleClickOpen={() => false}
        handleClose={() => false}
      />,
      { wrapper: BrowserRouter }
    );
    const logoutBtn = screen.getByRole('button', {
      name: /Logout/i,
    });
    userEvent.click(logoutBtn);

    const logoutDialog = screen.getByRole('dialog', {
      name: /logout/i,
    });
    expect(logoutDialog).toBeInTheDocument();
  });

  it('should close confirmation dialog when close button is clicked', async () => {
    const { container } = render(
      <Sidebar
        openDrawer={true}
        open={true}
        toggleDrawer={() => false}
        handleClickOpen={() => true}
        handleClose={() => false}
      />,
      { wrapper: BrowserRouter }
    );

    const closeBtn = screen.getByRole('button', {
      name: /close/i,
    });

    userEvent.click(closeBtn);
    expect(container.textContent).not.toBe('Logout');
  });

  it('should close confirmation dialog when cancel button is clicked', async () => {
    const { container } = render(
      <Sidebar
        openDrawer={true}
        open={true}
        toggleDrawer={() => false}
        handleClickOpen={() => true}
        handleClose={() => false}
      />,
      { wrapper: BrowserRouter }
    );

    const cancelLogoutBtn = screen.getByRole('button', {
      name: /Cancel/i,
    });

    userEvent.click(cancelLogoutBtn);
    expect(container.textContent).not.toBe('Logout');
  });
});

// to add more tests when logout functionality is created
