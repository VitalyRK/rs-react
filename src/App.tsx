import './styles/global.scss';
import ErrorBoundary from './helpers/ErrorBoundary';
import { RouterProvider } from 'react-router-dom';
import router from './router/Router';
import { AppProvider } from './providers/AppProvider';

function App() {
  return (
    <ErrorBoundary>
      <AppProvider>
        <RouterProvider router={router} />
      </AppProvider>
    </ErrorBoundary>
  );
}

export default App;
