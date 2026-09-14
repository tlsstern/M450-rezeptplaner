import {fireEvent, render, screen, waitFor} from '@testing-library/react';
import {MemoryRouter} from "react-router-dom";
import {addRecipe} from "../../apis/recipeApi";
import AddRecipe from "./AddRecipe";

jest.mock('../../apis/recipeApi');

test('sends the new recipe with its ingredient', async () => {
    addRecipe.mockResolvedValue({data: {}});
    render(<MemoryRouter><AddRecipe/></MemoryRouter>);

    fireEvent.change(screen.getByLabelText('Recipe Name:'), {target: {value: 'Pizza'}});
    fireEvent.click(screen.getByText('Add Ingredient'));
    fireEvent.change(screen.getByPlaceholderText('Quantity'), {target: {value: '2'}});
    fireEvent.click(screen.getByText('Submit'));

    await waitFor(() => expect(addRecipe).toHaveBeenCalledWith({
        name: 'Pizza', description: '', imageUrl: '',
        ingredients: [{name: '', unit: 'PIECE', amount: 2}]
    }));
});

test('does not send a recipe without name', async () => {
    render(<MemoryRouter><AddRecipe/></MemoryRouter>);

    fireEvent.click(screen.getByText('Submit'));

    expect(await screen.findByText('Name is required')).toBeInTheDocument();
    expect(addRecipe).not.toHaveBeenCalled();
});
