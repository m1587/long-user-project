import React, { useState, useContext } from 'react';
import { TextField, Button, Modal, Box } from '@mui/material';
import { UserContext } from '../context/UserContext';
import { User } from '../reducer/UserReducer';
import axios from 'axios';
export const UpdateUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('YourComponent must be used within a UserProvider');
  }

  const { state, dispatch } = context;
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState<User>({ ...state });
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    try {
      const res = await axios.put('http://localhost:3000/api/user/', {
          firstName: formData.firstName,
          email: formData.email,
          lastName: formData.lastName,
          address: formData.address,
          phone: formData.phone,
      }, {
          headers: {
              'user-id': formData.id,
              'Content-Type': 'application/json'
          }
      });
  } catch (error) {
      console.log(error);
  }
  dispatch(
      {
          type: 'UPDATE_USER',
          payload:formData,  

      });
  setOpen(false);
  };

  return (
      <>
      <Button onClick={() => setOpen(true)} sx={{ bgcolor: 'rgba(255, 255, 255, 0.8)',color: '#018ba3',zIndex: 1300 ,marginTop: 2, fontWeight: 'bold' }}>
        Update
      </Button>
      <Modal open={open} onClose={() => setOpen(false)}>
        <Box
          sx={{
            padding: 2,
            maxWidth: 400,
            margin: 'auto',
            marginTop: '20%',
            backgroundColor: 'white',
            borderRadius: 2,
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
          <Button
            onClick={handleSave}
            sx={{ width: '100%', backgroundColor: '#018ba3', color: 'white', padding: 1 }}
          >
            Save
          </Button>
        </Box>
      </Modal>
    </>
  );
};


