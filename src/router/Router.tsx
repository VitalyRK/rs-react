import { createBrowserRouter } from 'react-router-dom';
import Main from '../pages/main/Main';
import Layout from '../components/layout/Layout';
import NotFound from '../pages/not-found/NotFound';
import DetailPage from '../pages/detail-page/DetailPage';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        path: '/',
        element: <Main />,
        children: [
          {
            path: ':id',
            element: <Main />,
          },
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
]);

export default router;
