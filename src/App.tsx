import { RouterProvider } from 'react-router-dom';

import { router } from './router/Router';

import './styles/global.scss';

function App() {
  return <RouterProvider router={router} />;
}

export default App;
