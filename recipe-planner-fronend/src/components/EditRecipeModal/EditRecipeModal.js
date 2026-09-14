import React from 'react';
import {Button, Form, Modal} from "react-bootstrap";
import {useForm} from "react-hook-form";
import {updateRecipe} from "../../apis/recipeApi";

function EditRecipeModal({recipe, onClose, onSaved}) {
    const {register, handleSubmit, formState: {errors}} = useForm({values: recipe})

    const onSubmit = (data) => {
        updateRecipe(recipe.id, data).then(response => onSaved(response.data))
    }

    return (
        <Modal show={recipe !== null} onHide={onClose}>
            <Form onSubmit={handleSubmit(onSubmit)}>
                <Modal.Header closeButton>
                    <Modal.Title>Edit Recipe</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form.Group className="mb-1" controlId="editName">
                        <Form.Label>Recipe Name:</Form.Label>
                        <Form.Control {...register("name", {required: true})}/>
                        {errors.name && <p>Name is required</p>}
                    </Form.Group>
                    <Form.Group className="mb-1" controlId="editDescription">
                        <Form.Label>Description:</Form.Label>
                        <Form.Control {...register("description")}/>
                    </Form.Group>
                    <Form.Group className="mb-1" controlId="editImageUrl">
                        <Form.Label>Image URL:</Form.Label>
                        <Form.Control {...register("imageUrl")}/>
                    </Form.Group>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={onClose}>Cancel</Button>
                    <Button variant="primary" type="submit">Save</Button>
                </Modal.Footer>
            </Form>
        </Modal>
    )
}

export default EditRecipeModal;
