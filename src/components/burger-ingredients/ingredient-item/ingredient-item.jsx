import React, {useState} from 'react';
import css from './style.module.css';
import {CurrencyIcon, Counter} from '@ya.praktikum/react-developer-burger-ui-components';
import {IngredientDetails, Modal} from "../../modal";
import PropTypes from "prop-types";
import {useDrag} from "react-dnd";
import {useSelector} from "react-redux";

export const IngredientItem = ({apiData}) => {
    const [modalIsActive, setModalActive] = useState(false);
	const [{ isDrag }, dragRef] = useDrag({
		type: 'ingredient',
		item: apiData,
		collect: monitor => ({
			isDrag: monitor.isDragging()
		})
	})
	const opacity = isDrag ? 0.5 : 1;
	const { counts, bun } = useSelector(store => store.burgerIngredients);
	let count = (counts && typeof(counts[apiData._id]) !== 'undefined') ? counts[apiData._id] : 0;
	count = (apiData.type==='bun' && count && apiData._id === bun._id) ? 2 : (apiData.type==='bun' ? 0 : count);
    const productContent =
        <div className={css.product} onClick={()=>setModalActive(true)} ref={dragRef} style={{ opacity }}>
            <img src={apiData.image} alt={apiData.name}/>
            <span style={{display: 'inline-flex'}}>
                <span style={{marginRight:'8px'}}>{apiData.price}</span> <CurrencyIcon type="primary"/>
           </span>
            <span className="text text_type_main-small">
               {apiData.name}
           </span>
	        { count > 0 && <Counter count={count} size="default"/>}
        </div>

    return (
        <div>
            {productContent}
            {modalIsActive && <Modal header="Детали ингредиента" setModalActive={setModalActive}>
	            <IngredientDetails productData={apiData}/>
            </Modal>
            }
        </div>
    );
}

IngredientItem.propTypes = {
	name : PropTypes.string,
	image: PropTypes.string,
	price: PropTypes.number
};
export default IngredientItem;
