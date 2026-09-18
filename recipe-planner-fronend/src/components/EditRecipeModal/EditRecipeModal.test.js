import {fireEvent, render, screen, waitFor} from '@testing-library/react';
import {updateRecipe} from "../../apis/recipeApi";
import EditRecipeModal from "./EditRecipeModal";

jest.mock('../../apis/recipeApi');

const recipe = {id: '1', name: 'Lasagne', description: 'Old', imageUrl: 'http://image.url', ingredients: []};

test('saves the changed recipe', async () => {
    updateRecipe.mockResolvedValue({data: {...recipe, name: 'Pizza'}});
    const onSaved = jest.fn();
    render(<EditRecipeModal recipe={recipe} onClose={jest.fn()} onSaved={onSaved}/>);

    fireEvent.change(screen.getByLabelText('Recipe Name:'), {target: {value: 'Pizza'}});
    fireEvent.click(screen.getByText('Save'));

    await waitFor(() => expect(updateRecipe).toHaveBeenCalledWith('1', {...recipe, name: 'Pizza'}));
    expect(onSaved).toHaveBeenCalledWith({...recipe, name: 'Pizza'});
});

test('does not save without name', async () => {
    render(<EditRecipeModal recipe={recipe} onClose={jest.fn()} onSaved={jest.fn()}/>);

    fireEvent.change(screen.getByLabelText('Recipe Name:'), {target: {value: ''}});
    fireEvent.click(screen.getByText('Save'));

    expect(await screen.findByText('Name is required')).toBeInTheDocument();
    expect(updateRecipe).not.toHaveBeenCalled();
});

test('shows an error when saving fails', async () => {
    updateRecipe.mockRejectedValue(new Error('Request failed with status code 404'));
    render(<EditRecipeModal recipe={recipe} onClose={jest.fn()} onSaved={jest.fn()}/>);

    fireEvent.click(screen.getByText('Save'));

    expect(await screen.findByText('Recipe could not be saved')).toBeInTheDocument();
});
