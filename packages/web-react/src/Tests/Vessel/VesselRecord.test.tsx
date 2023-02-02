import React from 'react';
import '@testing-library/jest-dom';
import { act, render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import FisherfolkBoatRecord from '../../Components/FisherfolkRecord/FisherfolkBoatRecord';
import { MockedProvider } from '@apollo/client/testing';
import { VesselsQueryMock } from './query.mocks';

describe('Vessel Record Page', () => {
  const renderVesselRecordPage = () =>
    act(() => {
      render(
        <MockedProvider mocks={VesselsQueryMock}>
          <FisherfolkBoatRecord />
        </MockedProvider>
      );
    });

  it('check default state', async () => {
    renderVesselRecordPage();

    // get boat record page heading
    const heading = screen.getByRole('heading', { level: 6 });

    expect(heading.textContent).toBe('Fisherfolk Boat Record');
  });

  it('verify if necessary information is displayed on vessel record page', async () => {
    renderVesselRecordPage();

    // check if record has an id, date registered, mfvrNum, name, operator, status(?)
    const firstRecord = (
      await within(
        await screen.findByRole('grid', { name: /vessel-table/i })
      ).findAllByRole('row')
    )[1];

    const id = await within(firstRecord).findByRole('cell', {
      name: /125/i,
    });

    const date = await within(firstRecord).findByRole('cell', {
      name: '07/20/2021',
    });

    const mfvrNum = await within(firstRecord).findByRole('cell', {
      name: /2021-0075/i,
    });

    const name = await within(firstRecord).findByRole('cell', {
      name: /jj/i,
    });

    const operator = await within(firstRecord).findByRole('cell', {
      name: /green, mel rio/i,
    });

    expect(id).toBeInTheDocument();
    expect(date).toBeInTheDocument();
    expect(mfvrNum).toBeInTheDocument();
    expect(name).toBeInTheDocument();
    expect(operator).toBeInTheDocument();
  });

  it('check if records are sorted by id by default', async () => {
    renderVesselRecordPage();

    const records = await within(
      await screen.findByRole('grid', { name: /vessel-table/i })
    ).findAllByRole('row');

    const firstRecord = within(records[1]).getAllByRole('cell');
    const secondRecord = within(records[2]).getAllByRole('cell');

    expect(within(firstRecord[0]).getByText('125')).toBeTruthy();
    expect(within(secondRecord[0]).getByText('101')).toBeTruthy();
  });

  it('check if user is able to edit / archive record', async () => {
    renderVesselRecordPage();

    const firstRecord = (
      await within(
        await screen.findByRole('grid', { name: /vessel-table/i })
      ).findAllByRole('row')
    )[1];

    expect(firstRecord).toBeInTheDocument();

    const actionBtn = await within(firstRecord).findByRole('button', {
      name: /vessel-action-btn/i,
    });

    // clicks the kebab icon
    userEvent.click(actionBtn);

    const editMenu = await screen.findByRole('menuitem', {
      name: /edit/i,
    });

    const archiveMenu = await screen.findByRole('menuitem', {
      name: /archive/i,
    });

    expect(editMenu).toBeInTheDocument();
    expect(archiveMenu).toBeInTheDocument();
  });
});
