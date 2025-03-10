import React from 'react';
import style from "../modal/style.module.css";
import PropTypes from 'prop-types';

export const IngredientDetails = ({data}) => {
	return(
		<div className={style.modal_details} >
			<img src={data.image} alt={data.name}/>
			<span className="text text_type_main-medium pt-4">{data.name}</span>
			<div className={`${style.ingredient_info} pt-8`}>
				<span className="text">Калории, ккал<br/>{data.calories}</span>
				<span className="text">Белки, г<br/>{data.proteins}</span>
				<span className="text">Жиры, г<br/>{data.fat}</span>
				<span className="text">Углеводы, г<br/>{data.carbohydrates}</span>
			</div>
		</div>
	);
}

IngredientDetails.propTypes = {
	data : PropTypes.any
}
