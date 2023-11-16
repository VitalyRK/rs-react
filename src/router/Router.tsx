import { createBrowserRouter } from 'react-router-dom';

import Main from '../pages/main/Main';
import Layout from '../components/layout/Layout';
import NotFound from '../pages/not-found/NotFound';
import DetailPage from '../pages/detail-page/DetailPage';
import ErrorBoundary from '../helpers/ErrorBoundary';
import ErrorPage from '../pages/error-page/ErrorPage';
import { AppProvider } from '../providers/AppProvider';

export const routes = [
  {
    path: '/',
    element: (
      <AppProvider characters={undefined}>
        <Layout />
      </AppProvider>
    ),
    children: [
      {
        path: '/',
        element: <Main />,
        children: [
          {
            path: '/detail',
            element: <DetailPage />,
            children: [
              {
                path: ':key',
                element: <DetailPage />,
              },
            ],
          },
        ],
      },
    ],
  },
  {
    path: '*',
    element: <Layout />,
    children: [
      {
        path: '*',
        element: <NotFound />,
      },
    ],
  },
].map((route) => ({
  ...route,
  element: (
    <ErrorBoundary fallback={<ErrorPage />}>{route.element}</ErrorBoundary>
  ),
}));

export const router = createBrowserRouter(routes);
