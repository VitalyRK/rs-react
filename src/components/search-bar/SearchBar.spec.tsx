import { fireEvent, render } from '@testing-library/react';
import SearchBar from './SearchBar';
import { BrowserRouter } from 'react-router-dom';

describe('Tests for the Search componen', () => {
  beforeAll(() => {
    localStorage.removeItem('LOCAL_LAST_SEARCH_QUERY');
  });
  it('Verify that clicking the Search button saves the entered value to the local storage', () => {
    const { getByTestId } = render(
      <BrowserRouter>
        <SearchBar />
      </BrowserRouter>
    );
    const testText = 'Just some text';
    const inputElement = getByTestId('test-input');
    fireEvent.change(inputElement, {
      target: { value: testText },
    });
    fireEvent.click(getByTestId('test-btn'));
    const valueFromLocal = localStorage.getItem('LOCAL_LAST_SEARCH_QUERY');
    expect(inputElement).toHaveValue(valueFromLocal);
  });

  it('Check that the component retrieves the value from the local storage upon mounting', () => {
    const { getByTestId } = render(
      <BrowserRouter>
        <SearchBar />
      </BrowserRouter>
    );
    const inputElement = getByTestId('test-input');
    const valueFromLocal = localStorage.getItem('LOCAL_LAST_SEARCH_QUERY');
    expect(inputElement).toHaveValue(valueFromLocal);
  });
});
