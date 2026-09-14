import React, {useState} from 'react';
import './AddRecipe.css';
import {Form, Button, Col, Row} from 'react-bootstrap';
import {useNavigate} from "react-router-dom";

import axios from "axios";
import AddIngredient from "../AddIngredient/AddIngredient";

function AddRecipe() {
    const navigate = useNavigate()
    const [ ingredients, setIngredients ] = useState([])
    const [formData, setFormData] = useState({
        "name": '',
        "description": '',
        "imageUrl": '',
        "ingredients": []
    })

    const [listId, setListId] = useState(1)

    const handleChange = (e) => {
        setFormData({...formData, [e.target.name]: e.target.value})
    }

    const addIngredient = () => {

        setFormData(({...formData, ingredients: [
                ...formData.ingredients, {
                    listId: listId,
                    name: '',
                    unit: 'PIECE',
                    amount: ''
                }
            ]}))
        setListId(listId + 1)

    }
    const updateIngredient = (ingredientObj) => {
        const updatedIngredients = formData.ingredients.map((ingredient) => {
            if (ingredient.listId === ingredientObj.listId) {
                return ingredientObj
            }
            return ingredient
        })
        setFormData({...formData, ingredients: updatedIngredients})
    }

    const removeIngredient = (ingredientObj) => {
        const updatedIngredients = formData.ingredients.filter((ingredient) => ingredient.listId !== ingredientObj.listId)
        setFormData({...formData, ingredients: updatedIngredients})
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        const recipe = {...formData, ingredients: formData.ingredients.map(i => ({name: i.name, unit: i.unit, amount: Number(i.amount)}))}
        axios.post("/api/recipes", recipe).then(() => navigate("/"))
    }

    const renderIngredients = formData.ingredients.map(ingredient => <AddIngredient
        key={ingredient.listId}
        ingredient={ingredient}
        ingredients={ingredients}
        listId={listId - 1}
        updateIngredient={updateIngredient}
        removeIngredient={removeIngredient}
    />)

    return (
        <>
            <div className="bg">
                <Form className="m-3" onSubmit={handleSubmit}>
                    <h1 className="h3 bg-dark text-bg-primary mt-2">Add Recipe</h1>
                    <Form.Group className="mb-1" controlId="formBasicName">
                        <Form.Label>Recipe Name:</Form.Label>
                        <Form.Control placeholder="Name" name="name" value={formData.name} onChange={handleChange}/>
                    </Form.Group><Form.Group className="mb-1" controlId="formBasicDescription">
                        <Form.Label>Description:</Form.Label>
                        <Form.Control placeholder="Description" name="description" value={formData.description} onChange={handleChange}/>
                    </Form.Group><Form.Group className="mb-1 mb-5" controlId="formBasicImageUrl">
                        <Form.Label>Image URL:</Form.Label>
                        <Form.Control placeholder="URL" name="imageUrl" value={formData.imageUrl} onChange={handleChange}/>
                    </Form.Group>
                    <Row>
                        <Col>Ingredient</Col>
                        <Col>Unit</Col>
                        <Col>Quanity</Col>
                        <Col xs={1}></Col>
                    </Row>
                    <hr/>
                    <Row>
                        <br></br>
                    </Row>
                    {renderIngredients}
                    <Row>
                        <br></br>
                        <Button
                            variant='warning'
                            onClick={addIngredient}
                            className="mt-1"
                            >Add Ingredient</Button>
                    </Row>
                    <Button variant="primary"  type="submit" className="mb-5">
                        Submit
                    </Button>
                </Form>

            </div>

        </>
    )
}

export default AddRecipe;
