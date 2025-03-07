import React from 'react';
import style from './style.module.css';
import imgDone from '../../images/done.svg';
import {useSelector} from "react-redux";

export const OrderDetails = () => {
	const orderObj = useSelector(state => state.order);

	return(
		<div className={style.order_details}>
			<p className="text text_type_digits-large">{orderObj.number}</p>

			<p className="text text_type_main-medium">идентификатор заказа</p>

			<img src={imgDone} alt={"done"}/>

			<p className={style.small}>Ваш заказ начали готовить</p>

			<p className={style.small}>Дождитесь готовности на орбитальной станции</p>

		</div>
	);
}
