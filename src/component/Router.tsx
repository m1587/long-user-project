import { createBrowserRouter } from 'react-router-dom';
import Home from './Home';
import About from './About';
import AppLayout from './AppLayout';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <AppLayout />, 
    children: [
      {
        index: true,
        element: <Home />,  
      },
      {
        path: '/about',
        element: <About />,  
      },
    ],
  },
]);
