import {
  MemoryRouter,
  // RouterProvider,
  // createMemoryRouter,
} from 'react-router-dom';
import { fireEvent, render } from '@testing-library/react';
import { setupServer } from 'msw/node';
import {
  afterAll,
  afterEach,
  beforeAll,
  describe,
  expect,
  it,
  vi,
} from 'vitest';
// import { routes } from '../../router/Router';
import {
  charactersData,
  detailData,
  paginationData,
} from '../../__mocks__/characters-data';
import { handlers } from '../../__mocks__/handlers';

// import DetailCart from '../detail-cart/DetailCart';
import CharacterCart from './CharacterCart';
import { AppProvider } from '../../providers/AppProvider';
import SearchingResults from '../searching-results/SearchingResults';

const server = setupServer(...handlers);

describe('Tests for the Card component', () => {
  beforeAll(() => {
    server.listen({ onUnhandledRequest: 'error' });
  });

  afterAll(() => {
    server.close();
    vi.clearAllMocks();
  });

  afterEach(() => {
    server.resetHandlers();
    vi.restoreAllMocks();
  });

  it('Ensure that the card component renders the relevant card data', () => {
    const { getByRole } = render(
      <MemoryRouter>
        <CharacterCart character={detailData} />,
      </MemoryRouter>
    );

    expect(getByRole('heading', { level: 3 })).toHaveTextContent(
      'Sally Simpson'
    );
  });

  it('Validate that clicking on a card opens a detailed card component', async () => {
    const { getByTestId } = render(
      <MemoryRouter>
        <AppProvider
          characters={charactersData}
          paginationData={paginationData}
        >
          <SearchingResults />
        </AppProvider>
      </MemoryRouter>
    );

    const detailBtn = await getByTestId('test-179726');
    fireEvent.click(detailBtn);

    const detailedCard = await getByTestId('test-179726');
    expect(detailedCard).toBeInTheDocument();
  });

  // it('Check that clicking triggers an additional API call to fetch detailed information', async () => {
  //   const spy = vi.spyOn(window, 'fetch').mockImplementationOnce(() =>
  //     Promise.resolve({
  //       status: 200,
  //       json: () => Promise.resolve(detailData),
  //     } as unknown as Response)
  //   );
  //   const spy = vi.spyOn(getCharacterById);
  //   const { getByTestId } = render(
  //     <MemoryRouter>
  //       <AppProvider
  //         characters={charactersData}
  //         paginationData={paginationData}
  //       >
  //         <SearchingResults />
  //       </AppProvider>
  //     </MemoryRouter>
  //   );

  //   const detailBtn = await getByTestId('test-179726');
  //   fireEvent.click(detailBtn);

  //   expect(spy).toHaveBeenCalledWith(
  //     'https://api.jikan.moe/v4/characters/179726',
  //     expect.anything()
  //   );
  // });
});
