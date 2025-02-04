import { Box } from '@mui/material';
const Home = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        paddingTop: '10%',
        color: '#333333',
        textAlign: 'center',
        fontSize: '24px',
        fontFamily: 'fantasy',
      }}
    >
      <h2 style={{ color: "#C4A36D" }}>Recipe site</h2>
      <p>Welcome to the recipe website</p>
      <p>here you will find different and delicious recipes</p>
    </Box>
  );
};

export default Home;
