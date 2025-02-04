import { useContext, useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Box, TextField, Button, Modal } from '@mui/material';
import { recipeStore } from '../../store/RecipeStore';
import { UserContext } from '../../context/UserContext';
import { useNavigate } from 'react-router-dom';
import ErrorSnackbar from '../Error';
const recipeSchema = yup
    .object({
        title: yup.string().required('You must enter a title').min(3, 'The title must be at least 3 characters long'),
        description: yup.string().required('A description must be entered').min(10, 'The description must be at least 10 characters long'),
        ingredients: yup.string().required('Ingredients must be entered'),
        instructions: yup.string().required('Instructions must be entered')
    }).required();
type RecipeFormInputs = {
    title: string;
    description: string;
    ingredients: string;
    instructions: string;
};
const AddRecipe = () => {
    const [error, setError] = useState<any>(null);
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const navigate = useNavigate();
    const context = useContext(UserContext);
    if (!context) { throw new Error('Your Component must be used within a UserProvider'); }
    const [open, setOpen] = useState(true);
    const { register, formState: { errors }, handleSubmit } = useForm<RecipeFormInputs>({ resolver: yupResolver(recipeSchema) });
    const onSubmit: SubmitHandler<RecipeFormInputs> = async (data: any) => {
        const formattedData = { ...data, ingredients: data.ingredients.split('\n').map((ingredient: any) => ingredient.trim()) };
        try {
            await recipeStore.addRecipe(formattedData, context.state.id);
            setOpen(false);
            navigate('/RecipeList');
        } catch (error: any) {
            setError(error);
            setOpenSnackbar(true);
        }
    };
    return (
        <>
            <Modal open={open} onClose={() => setOpen(false)}>
                <Box
                    component="form"
                    onSubmit={handleSubmit(onSubmit)}
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
                    }}>
                    <TextField
                        label="Title" fullWidth
                        margin="normal"
                        {...register('title')}
                        error={!!errors.title}
                        helperText={errors.title?.message}
                    />
                    <TextField
                        label="Description" fullWidth
                        margin="normal"
                        {...register('description')}
                        error={!!errors.description}
                        helperText={errors.description?.message}
                        multiline
                        rows={4}
                    />
                    <TextField
                        label="Ingredients (one per line)" fullWidth
                        margin="normal"
                        {...register('ingredients')}
                        error={!!errors.ingredients}
                        helperText={errors.ingredients?.message}
                        multiline
                        rows={5}
                    />
                    <TextField
                        label="Instructions" fullWidth
                        margin="normal"
                        {...register('instructions')}
                        error={!!errors.instructions}
                        helperText={errors.instructions?.message}
                        multiline
                        rows={4}
                    />
                <Button type="submit" variant="contained" sx={{ mt: 2, backgroundColor: '#C4A36D', color: 'white' }} fullWidth>Add Recipe</Button>
                </Box>
            </Modal>
            <ErrorSnackbar error={error} open={openSnackbar} onClose={() => setOpenSnackbar(false)} />
        </>
    );};
export default AddRecipe;
