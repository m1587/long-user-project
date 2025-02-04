import { createBrowserRouter } from 'react-router-dom';
import Home from './Home';
import AppLayout from '../layouts/AppLayout';
import RecipeList from './recipe/RecipeList';
import AddRecipe from './recipe/AddRecipe';

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
        path: '/AddRecipe',
        element: <AddRecipe />,
      },
      {
        path: '/RecipeList',
        element: <RecipeList />,
      },
    ],
  },
]);
