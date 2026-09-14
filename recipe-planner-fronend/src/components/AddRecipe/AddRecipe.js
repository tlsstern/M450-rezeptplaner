import React, {useState} from 'react';
import './AddRecipe.css';
import { useFieldArray, useForm } from "react-hook-form";
import {Form, Button, Col, Row} from 'react-bootstrap';
import {useNavigate} from "react-router-dom";

import AddIngredient from "../AddIngredient/AddIngredient";
import {addRecipe} from "../../apis/recipeApi";

function AddRecipe() {
    const navigate = useNavigate()
    const [error, setError] = useState(null)

    const {
        register,
        handleSubmit,
        control,
        formState: {errors},
    } = useForm({defaultValues: {name: '', description: '', imageUrl: '', ingredients: []}})

    const {fields, append, remove} = useFieldArray({control, name: "ingredients"})

    const onSubmit = (data) => {
        addRecipe(data)
            .then(() => navigate("/"))
            .catch(() => setError("Recipe could not be saved"))
    }

    const renderIngredients = fields.map((field, index) => <AddIngredient
        key={field.id}
        index={index}
        register={register}
        removeIngredient={remove}
    />)

    return (
        <>
            <div className="bg">
                <Form className="m-3" onSubmit={handleSubmit(onSubmit)}>
                    <h1 className="h3 bg-dark text-bg-primary mt-2">Add Recipe</h1>
                    <Form.Group className="mb-1" controlId="formBasicName">
                        <Form.Label>Recipe Name:</Form.Label>
                        <Form.Control placeholder="Name" {...register("name", {required: true})}/>
                        {errors.name && <p>Name is required</p>}
                    </Form.Group><Form.Group className="mb-1" controlId="formBasicDescription">
                        <Form.Label>Description:</Form.Label>
                        <Form.Control placeholder="Description" {...register("description")}/>
                    </Form.Group><Form.Group className="mb-1 mb-5" controlId="formBasicImageUrl">
                        <Form.Label>Image URL:</Form.Label>
                        <Form.Control placeholder="URL" {...register("imageUrl")}/>
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
                            onClick={() => append({name: '', unit: 'PIECE', amount: ''})}
                            className="mt-1"
                            >Add Ingredient</Button>
                    </Row>
                    {error && <p>{error}</p>}
                    <Button variant="primary"  type="submit" className="mb-5">
                        Submit
                    </Button>
                </Form>

            </div>

        </>
    )
}

export default AddRecipe;
