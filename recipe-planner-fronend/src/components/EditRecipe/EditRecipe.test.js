import {fireEvent, render, screen, waitFor} from '@testing-library/react';
import {MemoryRouter, Route, Routes} from "react-router-dom";
import axios from "axios";
import EditRecipe from "./EditRecipe";

jest.mock('axios');

test('loads the recipe and saves the changed name', async () => {
    const recipe = {id: '1', name: 'Lasagne', description: 'Old', imageUrl: 'http://image.url', ingredients: []};
    axios.get.mockResolvedValue({data: recipe});
    axios.put.mockResolvedValue({data: recipe});
    render(
        <MemoryRouter initialEntries={['/edit/1']}>
            <Routes>
                <Route path="/edit/:id" element={<EditRecipe/>}/>
            </Routes>
        </MemoryRouter>
    );

    fireEvent.change(await screen.findByDisplayValue('Lasagne'), {target: {value: 'Pizza'}});
    fireEvent.click(screen.getByText('Save'));

    await waitFor(() => expect(axios.put).toHaveBeenCalledWith('/api/recipes/recipe/1', {...recipe, name: 'Pizza'}));
});
