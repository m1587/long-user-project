import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import { useState } from 'react';
import { Box } from '@mui/material';
import { UpdateUser } from '../component/user/UpdateUser';
import { Register } from '../component/user/Registration';
import { Login } from '../component/user/Login';
import { UserName } from '../component/user/UserName';

const AppLayout = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const handleLoginSuccess = () => {
    setIsLoggedIn(true);
  };
  return (
    <>
      <Box
        sx={{
          backgroundImage: 'url(public/images/image.jpg)',
          backgroundSize: 'cover',
          minHeight: '100vh',
        }}
      >
        <Navbar />
        <Box sx={{
          position: 'fixed',
          top: 10,
          left: 10,
          borderRadius: 1,
          zIndex: 1100,
        }}>
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
        </Box>
        <Outlet />
      </Box>
    </>
  );
};

export default AppLayout;