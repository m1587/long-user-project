
import { useContext, useState } from 'react';
import { Box, Button, Modal, TextField } from '@mui/material';
import { UserContext } from '../context/UserContext';
import axios from 'axios';

export const Login = ({ onLoginSuccess }: { onLoginSuccess: () => void }) => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('Your Component must be used within a UserProvider');
  }
  const { dispatch } = context;
  const [open, setOpen] = useState(false)
  const [userEmail, setUserEmail] = useState('')
  const [password, setPassword] = useState('')
  const handleLogin = async () => {
    try {
      const res = await axios.post('http://localhost:3000/api/user/login', {
        email: userEmail,
        password: password
      });
      dispatch({
        type: 'CREATE_USER',
        payload: res.data.user
      });
      console.log(res.data.message);

      if (res.data.message) {
        alert('Login successful!');
        setOpen(false);
        onLoginSuccess();
        setUserEmail('');
        setPassword('');
      } else {
        alert("You can't login");
      }
    } catch (error: Error | any) {
      alert('Error during login: ' + error.message);
    }
  }

  return (<>
    <Button onClick={() => setOpen(true)} sx={{bgcolor: 'rgba(255, 255, 255, 0.8)', color: '#018ba3',zIndex: 1300 ,marginTop: 2, fontWeight: 'bold' }}>Login</Button>
    <Modal open={open} onClose={() => setOpen(false)}>
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          padding: 2,
          width: 300,
          backgroundColor: 'white',
          borderRadius: 1,
          boxShadow: 24,
          zIndex: 1300,
          transform: 'translate(-50%, -50%)'
        }}
      >
        <TextField
          id="1"
          label="userEmail"
          value={userEmail}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            setUserEmail(event.target.value)
          }}
          fullWidth
          margin="normal"
        />
        <TextField
          id="2"
          label="password"
          value={password}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            setPassword(event.target.value)
          }}
          type="password"
          fullWidth
          margin="normal"
        />
        <Button onClick={handleLogin}
          sx={{ width: '100%', backgroundColor: '#018ba3', color: 'white', }}>
          Login</Button>
      </Box>
    </Modal>
  </>)
};



