
import React, { useState, useContext } from 'react';
import { TextField, Button, Modal, Box } from '@mui/material';
import { UserContext } from '../context/UserContext';
import axios from 'axios';

export const Register = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('Your Component must be used within a UserProvider');
  }

  const { dispatch } = context;
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    address: '',
    phone: '',
    password: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    try {
      console.log(formData);
      const res = await axios.post('http://localhost:3000/api/user/register', {
        email: formData.email,
        password: formData.password,
        firstName: formData.firstName,
        lastName: formData.lastName,
        address: formData.address,
        phone: formData.phone,
      });

      if (res.data.message) {
        dispatch({
          type: 'CREATE_USER',
          payload: res.data.user,
        });
        alert('Registration successful!');
        setFormData({
          firstName: '',
          lastName: '',
          email: '',
          address: '',
          phone: '',
          password: '',
        });
        setOpen(false);
      } else {
        alert("You can't registe");
      }
    } catch (error: any) {
      alert('Error during registration: ' + error.message);
    }
  };

  return (
    <>
      <Button onClick={() => setOpen(true)} sx={{ bgcolor: 'rgba(255, 255, 255, 0.8)', color: '#018ba3', zIndex: 1300, marginTop: 2, fontWeight: 'bold' }}>
        Register
      </Button>
      <Modal open={open} onClose={() => setOpen(false)}>
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            padding: 2,
            width: 300,
            backgroundColor: 'white',
            borderRadius: 1,
            boxShadow: 24,
            zIndex: 1300,
          }}
        >
          <TextField
            label="First Name"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            fullWidth
            sx={{ marginBottom: 2 }}
          />
          <TextField
            label="Last Name"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            fullWidth
            sx={{ marginBottom: 2 }}
          />
          <TextField
            label="Email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            type="email"
            fullWidth
            sx={{ marginBottom: 2 }}
          />
          <TextField
            label="Address"
            name="address"
            value={formData.address}
            onChange={handleChange}
            fullWidth
            sx={{ marginBottom: 2 }}
          />
          <TextField
            label="Phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            fullWidth
            sx={{ marginBottom: 2 }}
          />
          <TextField
            label="Password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            type="password"
            fullWidth
            sx={{ marginBottom: 2 }}
          />
          <Button
            onClick={handleSave}
            sx={{ width: '100%', backgroundColor: '#018ba3', color: 'white', padding: 1 }}
          >
            Register
          </Button>
        </Box>
      </Modal>
    </>
  );
}
