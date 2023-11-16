import { render } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { AppProvider } from '../../providers/AppProvider';
import {
  paginationData,
  charactersData,
} from '../../__mocks__/characters-data';
import { MemoryRouter } from 'react-router-dom';
import SearchingResults from './SearchingResults';

describe('Tests for the Card List component', () => {
  it('Verify that the component renders the specified number of cards', () => {
    const { getAllByRole } = render(
      <MemoryRouter>
        <AppProvider
          characters={charactersData}
          paginationData={paginationData}
        >
          <SearchingResults />
        </AppProvider>
      </MemoryRouter>
    );

    expect(getAllByRole('img')).toHaveLength(10);
  });

  it('Verify that the component renders the correct total number of cards.', () => {
    const testValue = 1000;

    const { getByRole } = render(
      <MemoryRouter>
        <AppProvider
          characters={undefined}
          paginationData={{
            current_page: 1,
            has_next_page: true,
            items: {
              count: 10,
              per_page: 10,
              total: testValue,
            },
            last_visible_page: 10,
          }}
        >
          <SearchingResults />
        </AppProvider>
      </MemoryRouter>
    );

    expect(getByRole('total')).toHaveTextContent(`Total results: ${testValue}`);
  });

  it('Check that an appropriate message is displayed if no cards are present', () => {
    const { getByText } = render(
      <MemoryRouter>
        <AppProvider characters={[]} paginationData={paginationData}>
          <SearchingResults />
        </AppProvider>
      </MemoryRouter>
    );

    expect(getByText('Oops... Nothing found.')).toBeDefined();
  });
});
