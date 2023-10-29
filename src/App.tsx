import { Component } from 'react';
import Main from './pages/main/Main';
import './styles/global.scss';
import ErrorBoundary from './helpers/ErrorBoundary';

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
