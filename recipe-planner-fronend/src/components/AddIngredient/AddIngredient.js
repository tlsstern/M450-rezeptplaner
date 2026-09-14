import React from 'react';
import PropTypes from 'prop-types';
import './AddIngredient.css';
import {Button, Col, Form, Row} from "react-bootstrap";

const AddIngredient = ({ingredients, ingredient, updateIngredient, removeIngredient}) => {

    return (
        <Row>
            <Col>
                <Form.Group className="mb-1" controlId="formBasicName">
                    <Form.Control placeholder="Name" value={ingredient.name}
                                  onChange={e => updateIngredient({...ingredient, name: e.target.value})}/>
                </Form.Group>
            </Col>
            <Col>
                <Form.Group className="mb-1" controlId="formBasicUnit">
                    <Form.Select value={ingredient.unit}
                                 onChange={e => updateIngredient({...ingredient, unit: e.target.value})}>
                        <option>PIECE</option>
                        <option>GRAMM</option>
                        <option>KILOGRAMM</option>
                        <option>LITRE</option>
                        <option>DECILITRE</option>
                    </Form.Select>
                </Form.Group>
            </Col>
            <Col>
                <Form.Group className="mb-1" controlId="quantity">
                    <Form.Control placeholder="Quantity" value={ingredient.amount}
                                  onChange={e => updateIngredient({...ingredient, amount: e.target.value})}/>
                </Form.Group>
            </Col>
            <Col xs={1}>
                <Button
                    onClick={e => removeIngredient(ingredient)}
                    variant='outline-dark'
                    className="mb-1"
                >x</Button>
            </Col>
        </Row>
    )
}

AddIngredient.propTypes = {};

AddIngredient.defaultProps = {};

export default AddIngredient;
