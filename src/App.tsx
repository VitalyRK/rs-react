import { Component } from 'react';

import ErrorBoundary from './helpers/ErrorBoundary';
import Main from './pages/main/Main';

import './styles/global.scss';

class App extends Component {
  render() {
    return (
      <ErrorBoundary>
        <Main />
      </ErrorBoundary>
    );
  }
}

export default App;
