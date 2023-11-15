import { RouterProvider, createMemoryRouter } from 'react-router-dom';
import { render } from '@testing-library/react';

import { routes } from '../../router/Router';

describe('Tests for the 404 Page component', () => {
  it('Ensure that the 404 page is displayed when navigating to an invalid route', () => {
    const badRoute = '/some/incorrect/path';
    const testText = 'Page Not Found';

    const routerTest = createMemoryRouter(routes, {
      initialEntries: [badRoute],
    });

    const { getByText } = render(<RouterProvider router={routerTest} />);

    expect(getByText(testText)).toBeDefined();
  });
});
