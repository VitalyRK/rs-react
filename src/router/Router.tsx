import { createBrowserRouter } from 'react-router-dom';

import Layout from '@/components/layout/Layout';
import ErrorBoundary from '@/helpers/ErrorBoundary';
import DetailPage from '@/pages/detail-page/DetailPage';
import ErrorPage from '@/pages/error-page/ErrorPage';
import Main from '@/pages/main/Main';
import NotFound from '@/pages/not-found/NotFound';

export const routes = [
  {
    path: '/',
    element: <Layout />,
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
