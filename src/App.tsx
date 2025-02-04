import { UserProvider } from './context/UserContext';
import { RouterProvider } from 'react-router-dom';
import { router } from './component/Router';


const App = () => {

  return (
    <UserProvider>
      <RouterProvider router={router} />
    </UserProvider>
  );
};

export default App;
