import React from 'react';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import CustomizedDialogs from '../../Components/ConfirmationDialog/ConfirmationDialog';
import { vi } from 'vitest';

const mockUsedNavigate = vi.fn();

vi.mock('react-router-dom', () => ({
  ...(vi.importActual('react-router-dom') as any),
  useNavigate: () => mockUsedNavigate,
}));

describe('Logout', () => {
  const handleLogout = () => {
    localStorage.removeItem('token');
    mockUsedNavigate('/login');
  };

  it('should close confirmation dialog when close button is clicked', async () => {
    const { container } = render(
      <CustomizedDialogs
        open={true}
        handleClose={() => false}
        handleLogout={handleLogout}
        title="Logout"
        message="Are you sure you want to logout?"
        leftBtnMsg="Cancel"
        rightBtnMsg="Logout"
      />
    );

    const closeBtn = screen.getByRole('button', {
      name: /close/i,
    });

    userEvent.click(closeBtn);
    expect(container.textContent).not.toBe('Logout');
  });

  it('should close confirmation dialog when cancel button is clicked', async () => {
    const { container } = render(
      <CustomizedDialogs
        open={true}
        handleClose={() => false}
        handleLogout={handleLogout}
        title="Logout"
        message="Are you sure you want to logout?"
        leftBtnMsg="Cancel"
        rightBtnMsg="Logout"
      />
    );

    const cancelLogoutBtn = screen.getByRole('button', {
      name: /Cancel/i,
    });

    userEvent.click(cancelLogoutBtn);
    expect(container.textContent).not.toBe('Logout');
  });

  it('should logout user', async () => {
    render(
      <CustomizedDialogs
        open={true}
        handleClose={() => false}
        handleLogout={handleLogout}
        title="Logout"
        message="Are you sure you want to logout?"
        leftBtnMsg="Cancel"
        rightBtnMsg="Logout"
      />
    );

    const logoutBtn = screen.getByRole('button', {
      name: /Logout/i,
    });

    userEvent.click(logoutBtn);
    expect(mockUsedNavigate).toHaveBeenCalledWith('/login');
  });
});
