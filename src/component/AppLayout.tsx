
import { Link, Outlet } from 'react-router-dom';
import { AppBar, Toolbar, Button } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';

const AppLayout = () => {
  return (
    <>
      <AppBar color="transparent"
        sx={{bgcolor: '#3b4249', boxShadow: 3 ,height: '11%'}}>
        <Toolbar  sx={{display: 'flex',justifyContent: 'flex-end',alignItems: 'flex-start',paddingRight: 2,}}>

          <Button color="inherit" component={Link} to="/about" sx={{ marginTop: 2, color: '#018ba3', fontWeight: 'bold',fontSize:"20px" }}>
            Conetact
          </Button>
          <Button color="inherit" component={Link} to="/" sx={{ marginTop: 2,color: '#018ba3', fontWeight: 'bold' }}>
          <HomeIcon fontSize="large"/>
          </Button>
        </Toolbar>
      </AppBar>
      <div style={{ padding: '20px', textAlign: 'center' }}>
        <Outlet /> 
      </div>
    </>
  );
};

export default AppLayout;
