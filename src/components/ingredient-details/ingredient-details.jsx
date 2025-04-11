import React, {useEffect, useState} from 'react';
import style from "../modal/style.module.css";
import {useParams} from "react-router-dom";
import {useSelector} from "react-redux";

export const IngredientDetails = () => {
    const params = useParams();
    const ingredients = useSelector(store => store.burger.ingredients);

    const [ingredient, setIngredient] = useState(false);

    useEffect(() => {
        console.log('ingredient', ingredient);
        console.log('params', params);
        setIngredient(
            params?.id && ingredients.find(i => i._id === params.id));
    }, [ ingredients]);

    return (
        ingredient && <div className={style.modal_details}>
            <img src={ingredient?.image} alt={ingredient.name}/>
            <span className="text text_type_main-medium pt-4">{ingredient.name}</span>
            <div className={`${style.ingredient_info} pt-8`}>
                <span className="text">Калории, ккал<br/>{ingredient.calories}</span>
                <span className="text">Белки, г<br/>{ingredient.proteins}</span>
                <span className="text">Жиры, г<br/>{ingredient.fat}</span>
                <span className="text">Углеводы, г<br/>{ingredient.carbohydrates}</span>
            </div>
        </div>
    );
}

