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

describe('Sort Fisherfolk Records', () => {
  const renderPage = () => {
    act(() => {
      render(
        <MockedProvider mocks={FisherfolksQueryMock}>
          <FisherfolkRecord />
        </MockedProvider>
      );
    });
  };

  it('sort fisherfolk records by id in ascending order', async () => {
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

    userEvent.hover(idColumn);

    const sortBtn = await within(columnHeaders[0]).findByRole('button', {
      description: /sort/i,
      hidden: true,
    });

    userEvent.click(sortBtn);

    const records = await within(
      await screen.findByRole('grid', { name: /fisherfolk-table/i })
    ).findAllByRole('row');

    const firstRecord = within(records[1]).getAllByRole('cell');
    const secondRecord = within(records[2]).getAllByRole('cell');

    expect(within(firstRecord[0]).getByText(/102/i)).toBeTruthy();
    expect(within(secondRecord[0]).getByText(/111/i)).toBeTruthy();
  });

  it('sort fisherfolk records by id in descending order', async () => {
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

    userEvent.hover(idColumn);

    const sortBtn = await within(columnHeaders[0]).findByRole('button', {
      description: /sort/i,
      hidden: true,
    });

    userEvent.dblClick(sortBtn);

    const records = await within(
      await screen.findByRole('grid', { name: /fisherfolk-table/i })
    ).findAllByRole('row');

    const firstRecord = within(records[1]).getAllByRole('cell');
    const secondRecord = within(records[2]).getAllByRole('cell');

    expect(within(firstRecord[0]).getByText(/111/i)).toBeTruthy();
    expect(within(secondRecord[0]).getByText(/102/i)).toBeTruthy();
  });

  it('sort fisherfolk records by dates in ascending order', async () => {
    renderPage();

    const tableHeader = (
      await within(
        await screen.findByRole('grid', { name: /fisherfolk-table/i })
      ).findAllByRole('row')
    )[0];

    const columnHeaders = await within(tableHeader).findAllByRole(
      'columnheader'
    );

    const dateColumn = within(columnHeaders[1]).getByText('Date Registered');

    userEvent.hover(dateColumn);

    const sortBtn = await within(columnHeaders[1]).findByRole('button', {
      description: /sort/i,
      hidden: true,
    });

    userEvent.click(sortBtn);

    const records = await within(
      await screen.findByRole('grid', { name: /fisherfolk-table/i })
    ).findAllByRole('row');

    const firstRecord = within(records[1]).getAllByRole('cell');
    const secondRecord = within(records[2]).getAllByRole('cell');

    expect(within(firstRecord[1]).getByText('17/03/2021')).toBeTruthy();
    expect(within(secondRecord[1]).getByText('15/04/2021')).toBeTruthy();
  });

  it('sort fisherfolk records by dates in descending order', async () => {
    renderPage();

    const tableHeader = (
      await within(
        await screen.findByRole('grid', { name: /fisherfolk-table/i })
      ).findAllByRole('row')
    )[0];

    const columnHeaders = await within(tableHeader).findAllByRole(
      'columnheader'
    );

    const dateColumn = within(columnHeaders[1]).getByText('Date Registered');

    userEvent.hover(dateColumn);

    const sortBtn = await within(columnHeaders[1]).findByRole('button', {
      description: /sort/i,
      hidden: true,
    });

    userEvent.dblClick(sortBtn);

    const records = await within(
      await screen.findByRole('grid', { name: /fisherfolk-table/i })
    ).findAllByRole('row');

    const firstRecord = within(records[1]).getAllByRole('cell');
    const secondRecord = within(records[2]).getAllByRole('cell');

    expect(within(firstRecord[1]).getByText('4/15/2021')).toBeTruthy();
    expect(within(secondRecord[1]).getByText('3/17/2021')).toBeTruthy();
  });

  it('sort fisherfolk records by names in ascending order', async () => {
    renderPage();

    const tableHeader = (
      await within(
        await screen.findByRole('grid', { name: /fisherfolk-table/i })
      ).findAllByRole('row')
    )[0];

    const columnHeaders = await within(tableHeader).findAllByRole(
      'columnheader'
    );

    const nameColumn = within(columnHeaders[2]).getByText('Name');

    userEvent.hover(nameColumn);

    const sortBtn = await within(columnHeaders[2]).findByRole('button', {
      description: /sort/i,
      hidden: true,
    });

    userEvent.click(sortBtn);

    const records = await within(
      await screen.findByRole('grid', { name: /fisherfolk-table/i })
    ).findAllByRole('row');

    const firstRecord = within(records[1]).getAllByRole('cell');
    const secondRecord = within(records[2]).getAllByRole('cell');

    expect(within(firstRecord[2]).getByText(/bonifacio, mark cornejo/i)).toBeTruthy();
    expect(within(secondRecord[2]).getByText(/flores, may sevilla/i)).toBeTruthy();
  });

  it('sort fisherfolk records by names in descending order', async () => {
    renderPage();

    const tableHeader = (
      await within(
        await screen.findByRole('grid', { name: /fisherfolk-table/i })
      ).findAllByRole('row')
    )[0];

    const columnHeaders = await within(tableHeader).findAllByRole(
      'columnheader'
    );

    const nameColumn = within(columnHeaders[2]).getByText('Name');

    userEvent.hover(nameColumn);

    const sortBtn = await within(columnHeaders[2]).findByRole('button', {
      description: /sort/i,
      hidden: true,
    });

    userEvent.dblClick(sortBtn);

    const records = await within(
      await screen.findByRole('grid', { name: /fisherfolk-table/i })
    ).findAllByRole('row');

    const firstRecord = within(records[1]).getAllByRole('cell');
    const secondRecord = within(records[2]).getAllByRole('cell');

    expect(within(firstRecord[2]).getByText(/flores, may sevilla/i)).toBeTruthy();
    expect(within(secondRecord[2]).getByText(/bonifacio, mark cornejo/i)).toBeTruthy();
  });

  it('sort fisherfolk records by livelihood in ascending order', async () => {
    renderPage();

    const tableHeader = (
      await within(
        await screen.findByRole('grid', { name: /fisherfolk-table/i })
      ).findAllByRole('row')
    )[0];

    const columnHeaders = await within(tableHeader).findAllByRole(
      'columnheader'
    );

    const livelihoodColumn = within(columnHeaders[4]).getByText('Livelihood');

    userEvent.hover(livelihoodColumn);

    const sortBtn = await within(columnHeaders[4]).findByRole('button', {
      description: /sort/i,
      hidden: true,
    });

    userEvent.click(sortBtn);

    const records = await within(
      await screen.findByRole('grid', { name: /fisherfolk-table/i })
    ).findAllByRole('row');

    const firstRecord = within(records[1]).getAllByRole('cell');
    const secondRecord = within(records[2]).getAllByRole('cell');

    expect(within(firstRecord[4]).getByText(/aquaculture/i)).toBeTruthy();
    expect(within(secondRecord[4]).getByText(/capture fishing/i)).toBeTruthy();
  });

  it('sort fisherfolk records by livelihood in descending order', async () => {
    renderPage();

    const tableHeader = (
      await within(
        await screen.findByRole('grid', { name: /fisherfolk-table/i })
      ).findAllByRole('row')
    )[0];

    const columnHeaders = await within(tableHeader).findAllByRole(
      'columnheader'
    );

    const livelihoodColumn = within(columnHeaders[4]).getByText('Livelihood');

    userEvent.hover(livelihoodColumn);

    const sortBtn = await within(columnHeaders[4]).findByRole('button', {
      description: /sort/i,
      hidden: true,
    });

    userEvent.dblClick(sortBtn);

    const records = await within(
      await screen.findByRole('grid', { name: /fisherfolk-table/i })
    ).findAllByRole('row');

    const firstRecord = within(records[1]).getAllByRole('cell');
    const secondRecord = within(records[2]).getAllByRole('cell');

    expect(within(firstRecord[4]).getByText(/capture fishing/i)).toBeTruthy();
    expect(within(secondRecord[4]).getByText(/aquaculture/i)).toBeTruthy();
  });

  it('sort fisherfolk records by barangay in ascending order', async () => {
    renderPage();

    const tableHeader = (
      await within(
        await screen.findByRole('grid', { name: /fisherfolk-table/i })
      ).findAllByRole('row')
    )[0];

    const columnHeaders = await within(tableHeader).findAllByRole(
      'columnheader'
    );

    const brgyColumn = within(columnHeaders[5]).getByText('Barangay');

    userEvent.hover(brgyColumn);

    const sortBtn = await within(columnHeaders[5]).findByRole('button', {
      description: /sort/i,
      hidden: true,
    });

    userEvent.click(sortBtn);

    const records = await within(
      await screen.findByRole('grid', { name: /fisherfolk-table/i })
    ).findAllByRole('row');

    const firstRecord = within(records[1]).getAllByRole('cell');
    const secondRecord = within(records[2]).getAllByRole('cell');

    expect(within(firstRecord[5]).getByText(/brgy. bito-on/i)).toBeTruthy();
    expect(within(secondRecord[5]).getByText(/brgy. simon ledesma/i)).toBeTruthy();
  });

  it('sort fisherfolk records by barangay in descending order', async () => {
    renderPage();

    const tableHeader = (
      await within(
        await screen.findByRole('grid', { name: /fisherfolk-table/i })
      ).findAllByRole('row')
    )[0];

    const columnHeaders = await within(tableHeader).findAllByRole(
      'columnheader'
    );

    const brgyColumn = within(columnHeaders[5]).getByText('Barangay');

    userEvent.hover(brgyColumn);

    const sortBtn = await within(columnHeaders[5]).findByRole('button', {
      description: /sort/i,
      hidden: true,
    });

    userEvent.dblClick(sortBtn);

    const records = await within(
      await screen.findByRole('grid', { name: /fisherfolk-table/i })
    ).findAllByRole('row');

    const firstRecord = within(records[1]).getAllByRole('cell');
    const secondRecord = within(records[2]).getAllByRole('cell');

    expect(within(firstRecord[5]).getByText(/brgy. simon ledesma/i)).toBeTruthy();
    expect(within(secondRecord[5]).getByText(/brgy. bito-on/i)).toBeTruthy();
  });

  it('sort fisherfolk records by status in ascending order', async () => {
    renderPage();

    const tableHeader = (
      await within(
        await screen.findByRole('grid', { name: /fisherfolk-table/i })
      ).findAllByRole('row')
    )[0];

    const columnHeaders = await within(tableHeader).findAllByRole(
      'columnheader'
    );

    const statusColumn = within(columnHeaders[6]).getByText('Status');

    userEvent.hover(statusColumn);

    const sortBtn = await within(columnHeaders[6]).findByRole('button', {
      description: /sort/i,
      hidden: true,
    });

    userEvent.click(sortBtn);

    const records = await within(
      await screen.findByRole('grid', { name: /fisherfolk-table/i })
    ).findAllByRole('row');

    const firstRecord = within(records[1]).getAllByRole('cell');
    const secondRecord = within(records[2]).getAllByRole('cell');

    expect(within(firstRecord[6]).getByText(/active/i)).toBeTruthy();
    expect(within(secondRecord[6]).getByText(/inactive/i)).toBeTruthy();
  });

  it('sort fisherfolk records by status in descending order', async () => {
    renderPage();

    const tableHeader = (
      await within(
        await screen.findByRole('grid', { name: /fisherfolk-table/i })
      ).findAllByRole('row')
    )[0];

    const columnHeaders = await within(tableHeader).findAllByRole(
      'columnheader'
    );

    const statusColumn = within(columnHeaders[6]).getByText('Status');

    userEvent.hover(statusColumn);

    const sortBtn = await within(columnHeaders[6]).findByRole('button', {
      description: /sort/i,
      hidden: true,
    });

    userEvent.dblClick(sortBtn);

    const records = await within(
      await screen.findByRole('grid', { name: /fisherfolk-table/i })
    ).findAllByRole('row');

    const firstRecord = within(records[1]).getAllByRole('cell');
    const secondRecord = within(records[2]).getAllByRole('cell');

    expect(within(firstRecord[6]).getByText(/inactive/i)).toBeTruthy();
    expect(within(secondRecord[6]).getByText(/active/i)).toBeTruthy();
  });
});
