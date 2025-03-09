import React from 'react';
import style from './style.module.css';
import {ingredientType} from '../../prop-types';
import PropTypes from "prop-types";
import IngredientItem from "../ingredient-item/ingredient-item";

export const IngredientList = ({data, subRef, id, title}) => {
    return (
        <>
            <p className="" id={id} ref={subRef}>
                {title}
            </p>
            <div className={style.ingredient_list}>
                {data?.length && data?.map((item) => {
                    return <IngredientItem key={item._id} data={item}/>
                })}
            </div>
        </>
    );
}

IngredientList.propTypes = {
    id: PropTypes.string,
    apiData: PropTypes.arrayOf(ingredientType)
};
export default IngredientList;
