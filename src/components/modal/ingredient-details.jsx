import React from 'react';
import css from "../burger-ingredients/ingredient-item/style.module.css";
import PropTypes from 'prop-types';

export const IngredientDetails = (props) => {
	//console.log(props.productData);
	return(
		<div className={css.product_portal} > {/*onClick={()=>setModalActive(true)}*/}
			<img src={props.productData.image} alt={props.productData.name} style={{width:'480px'}}/>
			<span className="text text_type_main-medium">{props.productData.name}</span>
			<div className={css.product_energy}>
				<span className="text text_type_main-small text_color_inactive">Калории, ккал<br/>{props.productData.calories}</span>
				<span className="text text_type_main-small text_color_inactive">Белки, г<br/>{props.productData.proteins}</span>
				<span className="text text_type_main-small text_color_inactive">Жиры, г<br/>{props.productData.fat}</span>
				<span className="text text_type_main-small text_color_inactive">Углеводы, г<br/>{props.productData.carbohydrates}</span>
			</div>
		</div>
	);
}

IngredientDetails.propTypes = {
	productData : PropTypes.any
}

/*

{
		productData: {
			name: PropTypes.string,
			image: PropTypes.string,
			price: PropTypes.string,
			calories: PropTypes.number,
			proteins: PropTypes.number,
			fat: PropTypes.number,
			carbohydrates: PropTypes.number
		}
	}

* */
