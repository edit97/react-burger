import React from 'react';
import style from './style.module.css';
import {ingredientType} from '../../../prop-types';
import PropTypes from "prop-types";
import IngredientItem from "../ingredient-item/ingredient-item";

export const IngredientList = (props) => {
    return (
       <>
           <p className="text text_type_main-medium" id={props.id} ref={props.subRef}>
	           {props.children}
           </p>
           <div className={style.product_list}>
               {props.apiData.map((itm) => {
                   return (<IngredientItem key={itm._id} apiData={itm}/>)
               })}
           </div>
       </>
    );
}

IngredientList.propTypes = {
	id : PropTypes.string,
	apiData: PropTypes.arrayOf(ingredientType)
};
export default IngredientList;
