import React from 'react';
import '@testing-library/jest-dom';
import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import FisherfolkRecord from '../../Components/FisherfolkRecord/FisherfolkRecord';
import { FisherfolksQueryMock } from './query.mocks';
import { MockedProvider } from '@apollo/client/testing';
import { vi } from 'vitest';
import { act } from 'react-dom/test-utils';

const mockUsedNavigate = vi.fn();

vi.mock('react-router-dom', () => ({
  ...(vi.importActual('react-router-dom') as any),
  useNavigate: () => mockUsedNavigate,
}));

describe('Fisherfolk Record Page', () => {
  const renderPage = () =>
    act(() => {
      render(
        <MockedProvider mocks={FisherfolksQueryMock}>
          <FisherfolkRecord />
        </MockedProvider>
      );
    });

  it('check default state', async () => {
    renderPage();

    // get fisherfolk record page heading
    const heading = screen.getByRole('heading', { level: 6 });

    const addFisherfolkBtn = screen.getByRole('button', {
      name: /add fisherfolk/i,
    });

    expect(heading.textContent).toBe('Fisherfolk Record');
    expect(addFisherfolkBtn.textContent).toBe('Add Fisherfolk');
  });

  it('verify if necessary information is displayed on fisherfolk record page', async () => {
    renderPage();

    // check if record has an id, date registered, name, contact number, livelihood, barangay, status
    const firstRecord = (
      await within(
        await screen.findByRole('grid', { name: /fisherfolk-table/i })
      ).findAllByRole('row')
    )[1];

    expect(firstRecord).toBeInTheDocument();

    const id = await within(firstRecord).findByRole('cell', {
      name: /111/i,
    });

    const date = await within(firstRecord).findByRole('cell', {
      name: '04/15/2021',
    });

    const name = await within(firstRecord).findByRole('cell', {
      name: /flores, may sevilla/i,
    });

    const contactNum = await within(firstRecord).findByRole('cell', {
      name: /09993716821/i,
    });

    const livelihood = await within(firstRecord).findByRole('cell', {
      name: /capture fishing/i,
    });

    const barangay = await within(firstRecord).findByRole('cell', {
      name: /brgy. simon ledesma/i,
    });

    const status = await within(firstRecord).findByRole('cell', {
      name: /Active/i,
    });

    expect(id).toBeInTheDocument();
    expect(date).toBeInTheDocument();
    expect(contactNum).toBeInTheDocument();
    expect(name).toBeInTheDocument();
    expect(livelihood).toBeInTheDocument();
    expect(barangay).toBeInTheDocument();
    expect(status).toBeInTheDocument();
  }, 20_000);

  it('check if records are sorted by date and status by default', async () => {
    renderPage();

    const records = await within(
      await screen.findByRole('grid', { name: /fisherfolk-table/i })
    ).findAllByRole('row');

    const firstRecord = within(records[1]).getAllByRole('cell');
    const secondRecord = within(records[2]).getAllByRole('cell');

    expect(within(firstRecord[1]).getByText('04/15/2021')).toBeTruthy();
    expect(within(firstRecord[6]).getByText(/active/i)).toBeTruthy();
    expect(within(secondRecord[1]).getByText('03/17/2021')).toBeTruthy();
    expect(within(secondRecord[6]).getByText(/inactive/i)).toBeTruthy();
  });

  it('check if user is able to view / edit / archive record', async () => {
    renderPage();

    const secondRecord = (
      await within(
        await screen.findByRole('grid', { name: /fisherfolk-table/i })
      ).findAllByRole('row')
    )[2];

    expect(secondRecord).toBeInTheDocument();

    const actionBtn = await within(secondRecord).findByRole('button', {
      name: /fisherfolk-action-btn/i,
    });

    // clicks the kebab icon
    userEvent.click(actionBtn);

    const viewMenu = await screen.findByRole('menuitem', {
      name: /view/i,
    });

    const editMenu = await screen.findByRole('menuitem', {
      name: /edit/i,
    });

    const archiveMenu = await screen.findByRole('menuitem', {
      name: /archive/i,
    });

    expect(viewMenu).toBeInTheDocument();
    expect(editMenu).toBeInTheDocument();
    expect(archiveMenu).toBeInTheDocument();
  });

  it('check if the user should be able to sort records', async () => {
    renderPage();

    const tableHeader = (
      await within(
        await screen.findByRole('grid', { name: /fisherfolk-table/i })
      ).findAllByRole('row')
    )[0];

    const columnHeaders = await within(tableHeader).findAllByRole(
      'columnheader'
    );
    const idColumn = within(columnHeaders[0]).getByText('ID');
    const dateColumn = within(columnHeaders[1]).getByText('Date Registered');
    const nameColumn = within(columnHeaders[2]).getByText('Name');
    const livelihoodColumn = within(columnHeaders[4]).getByText('Livelihood');
    const brgyColumn = within(columnHeaders[5]).getByText('Barangay');
    const statusColumn = within(columnHeaders[6]).getByText('Status');

    userEvent.hover(idColumn);
    userEvent.hover(dateColumn);
    userEvent.hover(nameColumn);
    userEvent.hover(livelihoodColumn);
    userEvent.hover(brgyColumn);
    userEvent.hover(statusColumn);

    expect(
      await within(columnHeaders[0]).findByRole('button', {
        description: /sort/i,
        hidden: true,
      })
    ).toBeInTheDocument();
    expect(
      await within(columnHeaders[1]).findByRole('button', {
        description: /sort/i,
        hidden: true,
      })
    ).toBeInTheDocument();
    expect(
      await within(columnHeaders[2]).findByRole('button', {
        description: /sort/i,
        hidden: true,
      })
    ).toBeInTheDocument();
    expect(
      await within(columnHeaders[4]).findByRole('button', {
        description: /sort/i,
        hidden: true,
      })
    ).toBeInTheDocument();
    expect(
      await within(columnHeaders[5]).findByRole('button', {
        description: /sort/i,
        hidden: true,
      })
    ).toBeInTheDocument();
    expect(
      await within(columnHeaders[6]).findByRole('button', {
        description: /sort/i,
        hidden: true,
      })
    ).toBeInTheDocument();
  });
});
