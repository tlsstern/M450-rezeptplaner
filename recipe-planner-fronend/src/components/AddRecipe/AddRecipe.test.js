import {fireEvent, render, screen, waitFor} from '@testing-library/react';
import {MemoryRouter} from "react-router-dom";
import axios from "axios";
import AddRecipe from "./AddRecipe";

// axios is an es module, jest can't load it without the factory
jest.mock('axios', () => ({post: jest.fn()}));

test('sends the new recipe to the backend', async () => {
    axios.post.mockResolvedValue({data: {}});
    render(<MemoryRouter><AddRecipe/></MemoryRouter>);

    fireEvent.change(screen.getByLabelText('Recipe Name:'), {target: {value: 'Pizza'}});
    fireEvent.change(screen.getByLabelText('Description:'), {target: {value: 'With cheese'}});
    fireEvent.click(screen.getByText('Submit'));

    await waitFor(() => expect(axios.post).toHaveBeenCalledWith('/api/recipes',
        {name: 'Pizza', description: 'With cheese', imageUrl: '', ingredients: []}));
});

test('shows an error when the recipe could not be saved', async () => {
    axios.post.mockRejectedValue(new Error('Request failed'));
    render(<MemoryRouter><AddRecipe/></MemoryRouter>);

    fireEvent.click(screen.getByText('Submit'));

    expect(await screen.findByText('Recipe could not be saved')).toBeInTheDocument();
});
