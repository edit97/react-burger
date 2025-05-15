import React from 'react';
import style from '../modal/style.module.css';
import img_success from '../../images/success.svg';
import {TReduxStore} from "../../utils/types";
import {useAppSelector} from "../../services/store";

export const OrderDetails: React.FC = () => {
	const order = useAppSelector((state: TReduxStore) => state.order);

	return(
		<div className={style.order_details}>
			<p className="text text_type_digits-large">{order?.order?.number}</p>

			<p className="text text_type_main-medium">идентификатор заказа</p>

			<img src={img_success} alt={"done"}/>

			<p className={style.small}>Ваш заказ начали готовить</p>

			<p className={style.text}>Дождитесь готовности на орбитальной станции</p>
		</div>
	);
}
