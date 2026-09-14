import React from 'react';
import './AddIngredient.css';
import {Button, Col, Form, Row} from "react-bootstrap";

const AddIngredient = ({index, register, removeIngredient}) => {

    return (
        <Row>
            <Col>
                <Form.Group className="mb-1">
                    <Form.Control placeholder="Name" {...register(`ingredients.${index}.name`)}/>
                </Form.Group>
            </Col>
            <Col>
                <Form.Group className="mb-1">
                    <Form.Select {...register(`ingredients.${index}.unit`)}>
                        <option>PIECE</option>
                        <option>GRAMM</option>
                        <option>KILOGRAMM</option>
                        <option>LITRE</option>
                        <option>DECILITRE</option>
                    </Form.Select>
                </Form.Group>
            </Col>
            <Col>
                <Form.Group className="mb-1">
                    <Form.Control type="number" placeholder="Quantity"
                                  {...register(`ingredients.${index}.amount`, {valueAsNumber: true})}/>
                </Form.Group>
            </Col>
            <Col xs={1}>
                <Button
                    onClick={() => removeIngredient(index)}
                    variant='outline-dark'
                    className="mb-1"
                >x</Button>
            </Col>
        </Row>
    )
}

export default AddIngredient;
