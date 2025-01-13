import { UserProvider } from './context/UserContext';
import { Login } from './component/Login';
import { UserName } from './component/UserName';
import { UpdateUser } from './component/UpdateUser';
import { Box, Typography } from '@mui/material';
import { Register } from './component/Registration';
import { useState } from 'react';
import { RouterProvider } from 'react-router-dom';
import { router } from './component/Router';

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLoginSuccess = () => {
    setIsLoggedIn(true);
  };

  return (
    <UserProvider>
      {isLoggedIn ? (
        <>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <UserName />
            <UpdateUser />
          </Box>
        </>
      ) : (
        <>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Login onLoginSuccess={handleLoginSuccess} />
            <Register />
          </Box>
        </>
      )}
      <RouterProvider router={router} />
    </UserProvider>
  );
};

export default App;
