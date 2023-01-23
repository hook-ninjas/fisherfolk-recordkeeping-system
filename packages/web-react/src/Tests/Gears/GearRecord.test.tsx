import React from 'react';
import '@testing-library/jest-dom';
import { act, render, screen, within } from '@testing-library/react';
import FisherfolkGearRecord from '../../Components/FisherfolkRecord/FisherfolkGearRecord';
import userEvent from '@testing-library/user-event';
import { MockedProvider } from '@apollo/client/testing';
import { GearsQueryMock } from './query.mocks';

describe('Gear Record Page', () => {
  const renderGearRecordPage = () =>
    act(() => {
      render(
        <MockedProvider mocks={GearsQueryMock}>
          <FisherfolkGearRecord />
        </MockedProvider>
      );
    });

  it('check default state', async () => {
    renderGearRecordPage();

    // get gear record page heading
    const heading = screen.getByRole('heading', { level: 6 });
    expect(heading.textContent).toBe('Fisherfolk Gear Record');
  });

  it('verify if necessary information is displayed on gear record page', async () => {
    renderGearRecordPage();

    // check if record has an id, date registered, classsification, type, operator, status(?)
    const firstRecord = (
      await within(
        await screen.findByRole('grid', { name: /gear-table/i })
      ).findAllByRole('row')
    )[1];

    const id = await within(firstRecord).findByRole('cell', {
      name: /201/i,
    });

    const date = await within(firstRecord).findByRole('cell', {
      name: '21/10/2021',
    });

    const classification = await within(firstRecord).findByRole('cell', {
      name: /falling gear/i,
    });

    const name = await within(firstRecord).findByRole('cell', {
      name: /simple-hand Line/i,
    });

    const operator = await within(firstRecord).findByRole('cell', {
      name: /samonte, roy rizal/i,
    });

    expect(id).toBeInTheDocument();
    expect(date).toBeInTheDocument();
    expect(classification).toBeInTheDocument();
    expect(name).toBeInTheDocument();
    expect(operator).toBeInTheDocument();
  });

  it('check if records are sorted by id by default', async () => {
    renderGearRecordPage();

    const records = await within(
      await screen.findByRole('grid', { name: /gear-table/i })
    ).findAllByRole('row');

    const firstRecord = within(records[1]).getAllByRole('cell');
    const secondRecord = within(records[2]).getAllByRole('cell');

    expect(within(firstRecord[0]).getByText('201')).toBeTruthy();
    expect(within(secondRecord[0]).getByText('189')).toBeTruthy();
  });

  it('check if user is able to edit / archive record', async () => {
    renderGearRecordPage();

    const secondRecord = (
      await within(
        await screen.findByRole('grid', { name: /gear-table/i })
      ).findAllByRole('row')
    )[2];

    expect(secondRecord).toBeInTheDocument();

    const actionBtn = await within(secondRecord).findByRole('button', {
      name: /gear-action-btn/i,
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
