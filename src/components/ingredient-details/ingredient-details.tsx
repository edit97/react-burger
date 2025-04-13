import React, {useEffect, useState} from 'react';
import style from "../modal/style.module.css";
import {useParams} from "react-router-dom";
import {useSelector} from "react-redux";
import {TIngredient, TReduxStore} from "../../utils/types";

export const IngredientDetails: React.FC = () => {
    const params = useParams();
    const ingredients = useSelector((store:TReduxStore) => store.burger.ingredients);

    const [ingredient, setIngredient] = useState<TIngredient | null>(null);

    useEffect(() => {
        if (params?.id && ingredients?.length > 0) {
            const found = ingredients.find((i: TIngredient) => i._id === params?.id) || null;
            setIngredient(found);
        }
    }, [ ingredients, params?.id]);

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

