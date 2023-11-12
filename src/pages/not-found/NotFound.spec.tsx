import NotFound from './NotFound';
import { renderWithRouter } from '../../__test__/renderWithRouter';

describe('Tests for the 404 Page component', () => {
  it('Ensure that the 404 page is displayed when navigating to an invalid route', () => {
    const badRoute = '/some/incorrect/path';
    const testText = 'Page Not Found';
    const { getByText } = renderWithRouter(<NotFound />, {
      route: badRoute,
    });

    expect(getByText(testText)).toBeDefined();
  });
});
