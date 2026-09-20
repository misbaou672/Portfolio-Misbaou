import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';

import { Providers } from '@/app/Providers';
import { Layout } from '@/app/Layout';

import '@/styles/fonts.css';
import '@/styles/tokens.css';
import '@/styles/global.css';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
  },
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Providers>
      <RouterProvider router={router} />
    </Providers>
  </StrictMode>,
);
