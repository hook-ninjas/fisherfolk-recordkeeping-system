import React from 'react';
import '@testing-library/jest-dom';
import { act, render, screen } from '@testing-library/react';
import Dashboard from '../../Components/Dashboard/Dashboard';
import { MockedProvider } from '@apollo/client/testing';
import { DashboardQueryMock } from './query.mocks';

describe('Dashboard Page', () => {
  const renderDashboardPage = () =>
    act(() => {
      render(
        <MockedProvider mocks={DashboardQueryMock}>
          <Dashboard />
        </MockedProvider>
      );
    });
  
  it('checks fisherfolk count display', async () => {
    renderDashboardPage();

    const totalGears = await screen.findByRole('heading', {
      level: 4,
      name: /total gears-540/i,
    });

    const totalBarangays = await screen.findByRole('heading', {
      level: 4,
      name: /total barangays-25/i,
    });

    expect(totalGears).toBeInTheDocument();
    expect(totalBarangays).toBeInTheDocument();
  });

  it('checks livelihood count display', async  () => {
    renderDashboardPage();

    const aquaculture = await screen.findByRole('heading', {
      level: 4,
      name: /aquaculture-345/i,
    });

    const captureFishing = await screen.findByRole('heading', {
      level: 4,
      name: /capturefishing-490/i,
    });

    const fishProcessing = await screen.findByRole('heading', {
      level: 4,
      name: /fishprocessing-165/i,
    });

    const fishVending = await screen.findByRole('heading', {
      level: 4,
      name: /fishvending-248/i,
    });

    const others = await screen.findByRole('heading', {
      level: 4,
      name: /others-128/i,
    });

    expect(aquaculture).toBeInTheDocument();
    expect(captureFishing).toBeInTheDocument();
    expect(fishProcessing).toBeInTheDocument();
    expect(fishVending).toBeInTheDocument();
    expect(others).toBeInTheDocument();
  });
});
