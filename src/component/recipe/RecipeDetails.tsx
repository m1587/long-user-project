
import { observer } from 'mobx-react';
import { Typography, Box } from '@mui/material';
import { recipeStore } from '../../store/RecipeStore';

const RecipeDetails = observer(() => {
  const selectedRecipe = recipeStore.selectedRecipe;

  if (!selectedRecipe) {
    return;
  }

  return (
    <Box sx={{
      position: 'absolute',
      top: " 60%",
      left: '30%',
      transform: 'translateY(-50%)',
      width: '700px',
      height: '80vh',
      backgroundColor: '#f4f4f4',
      padding: '20px',
      boxShadow: '2px 0px 5px rgba(238, 164, 115, 0.2)',
      borderRadius: '8px',
      overflowY: 'auto',
    }}>

      <Typography variant="h4" gutterBottom color='#8B4513'>
        {selectedRecipe.title}
      </Typography>
      <Typography variant="h6" color='#D2B48C'>{selectedRecipe.description}</Typography>
      <Typography 
      variant="h6" component="div" color='#C4A36D' sx={{ textDecoration: 'underline', textAlign: 'left', marginBottom: '8px' }}>
        ingredients:
      </Typography>
      <Typography variant="h6" component="div" color='#333333'>
        {Array.isArray(selectedRecipe.ingredients)
          ? selectedRecipe.ingredients.map((ingredient, index) => (
            <li key={index} style={{ textAlign: 'left', marginBottom: '8px' }}>
              {ingredient}
            </li>
          ))
          : selectedRecipe.ingredients}
      </Typography>
      <Typography
       variant="h6" component="div" color='#C4A36D' sx={{ textDecoration: 'underline', textAlign: 'left', marginBottom: '8px' }}>
        instructions:
       </Typography>
      <Typography variant="body1" color='#333333'>{selectedRecipe.instructions}</Typography>

    </Box>
  );
});

export default RecipeDetails;
