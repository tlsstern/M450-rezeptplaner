import React, {useEffect, useState} from 'react';
import {Button, Form} from "react-bootstrap";
import {useNavigate, useParams} from "react-router-dom";
import axios from "axios";

function EditRecipe() {
    const {id} = useParams()
    const navigate = useNavigate()
    const [recipe, setRecipe] = useState(null)
    const [error, setError] = useState(null)

    useEffect(() => {
        axios.get(`/api/recipes/recipe/${id}`)
            .then(response => setRecipe(response.data))
            .catch(() => setError("Recipe not found"))
    }, [id])

    const handleChange = (e) => {
        setRecipe({...recipe, [e.target.name]: e.target.value})
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        axios.put(`/api/recipes/recipe/${id}`, recipe)
            .then(() => navigate("/"))
            .catch(() => setError("Recipe could not be saved"))
    }

    if (!recipe) return error && <p className="m-3">{error}</p>

    return (
        <Form className="m-3" onSubmit={handleSubmit}>
            <h1 className="h3">Edit Recipe</h1>
            <Form.Group className="mb-1" controlId="editName">
                <Form.Label>Recipe Name:</Form.Label>
                <Form.Control name="name" value={recipe.name} onChange={handleChange}/>
            </Form.Group>
            <Form.Group className="mb-1" controlId="editDescription">
                <Form.Label>Description:</Form.Label>
                <Form.Control name="description" value={recipe.description} onChange={handleChange}/>
            </Form.Group>
            <Form.Group className="mb-3" controlId="editImageUrl">
                <Form.Label>Image URL:</Form.Label>
                <Form.Control name="imageUrl" value={recipe.imageUrl} onChange={handleChange}/>
            </Form.Group>
            {error && <p>{error}</p>}
            <Button variant="primary" type="submit">Save</Button>
        </Form>
    )
}

export default EditRecipe;
