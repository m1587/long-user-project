import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AppBar, Toolbar, Button } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import { UserContext } from '../context/UserContext';

const Navbar = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('Navbar must be used within a UserProvider');
  }
  const isLoggedIn = !!context.state.id;

  return (
    <AppBar color="transparent" sx={{ bgcolor: "#f9f1a5", boxShadow: 3, height: '11%' }}>
      <Toolbar sx={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'flex-start', paddingRight: 2 }}>
        {isLoggedIn && (
          <Button
            color="inherit"
            component={Link}
            to="/AddRecipe"
            sx={{ marginTop: 2, color: '#ffffff', fontWeight: 'bold', fontSize: "20px" }}
            >
            AddRecipe
          </Button>
        )}
        <Button
          color="inherit"
          component={Link}
          to="/RecipeList"
          sx={{ marginTop: 2, color: '#ffffff', fontWeight: 'bold', fontSize: "20px" }}
        >
          Recipes
        </Button>
        <Button
          color="inherit"
          component={Link}
          to="/"
          sx={{ marginTop: 2, color: '#333333', fontWeight: 'bold' }}
        >
          <HomeIcon fontSize="large" />
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
