import { useEffect, useState } from 'react';
import { observer } from 'mobx-react';
import { Box, Typography, List, ListItemText, ListItemButton, CircularProgress } from '@mui/material';
import { recipeStore } from '../../store/RecipeStore';
import RecipeDetails from './RecipeDetails'
import ErrorSnackbar from '../Error';

const RecipeList = observer(() => {
  const [error, setError] = useState<any>(null);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        await recipeStore.getRecipe();
      } catch (error: any) {
        setError(error);
        setOpenSnackbar(true);
      } finally {
        setLoading(false);
      }
    };
    fetchRecipes();
  }, []);

  return (
    <>
      <Box sx={{
        width: '100%',
        maxWidth: 300,
        bgcolor: 'background.paper',
        position: 'absolute',
        top: 100,
        right: 0,
      }}>
        <nav>
          <List>
            {loading ? (
              <CircularProgress sx={{ display: 'block', margin: 'auto' }} />
            ) : Array.isArray(recipeStore.recipes) && recipeStore.recipes.length > 0 ? (
              recipeStore.recipes.map((recipe) => (
                <ListItemButton
                  key={recipe.id}
                  onClick={() => recipeStore.selectRecipe(recipe)}
                >
                  <ListItemText primary={recipe.title} sx={{ textAlign: 'center', fontSize: '30px', fontWeight: 'bold', color: '#333333' }} />
                </ListItemButton>
              ))
            ) : (
              <Typography variant="body1" sx={{ textAlign: 'center' }}>
                No recipes found.
              </Typography>
            )}
          </List>
        </nav>
      </Box>
      <RecipeDetails />
      <ErrorSnackbar error={error} open={openSnackbar} onClose={() => setOpenSnackbar(false)} />
    </>
  );
});

export default RecipeList;
