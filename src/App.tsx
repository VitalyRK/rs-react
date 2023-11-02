import './styles/global.scss';
import ErrorBoundary from './helpers/ErrorBoundary';
import { RouterProvider } from 'react-router-dom';
import router from './router/Router';

function App() {
  return (
    <ErrorBoundary>
      <RouterProvider router={router} />
    </ErrorBoundary>
  );
}

export default App;
