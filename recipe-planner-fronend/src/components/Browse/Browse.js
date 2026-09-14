import React, {useEffect, useState} from 'react';
import './Browse.css';
import axios from "axios";
import Recipe from "../Recipe/Recipe";
import EditRecipeModal from "../EditRecipeModal/EditRecipeModal";
import {Col, Row} from "react-bootstrap";

const baseURL = "/api/recipes";


const Browse = () => {

        const [post, setPost] = React.useState(null);
        const [editRecipe, setEditRecipe] = React.useState(null);

        React.useEffect(() => {
            axios.get(baseURL).then((response) => {
                setPost(response.data);
            });
        }, []);

        const replaceRecipe = (updated) => {
            setPost(post.map(r => r.id === updated.id ? updated : r));
            setEditRecipe(null);
        };

        if (!post) return null;

        return (
            <>
                <Row>
                    {post.map((d) => (
                        <Col key={d.id} sm={12} md={6} lg={4} xl={3}>
                            <Recipe title={d.name} description={d.description} image={d.imageUrl}
                                    onEdit={() => setEditRecipe(d)} />
                        </Col>
                    ))}
                </Row>
                <EditRecipeModal recipe={editRecipe} onClose={() => setEditRecipe(null)} onSaved={replaceRecipe} />
            </>
        );
}


Browse.propTypes = {};

Browse.defaultProps = {};

export default Browse;
