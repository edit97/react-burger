import React, {useState} from 'react';
import style from './style.module.css';
import {CurrencyIcon, Counter} from '@ya.praktikum/react-developer-burger-ui-components';
import {Modal} from "../modal/modal";
import PropTypes from "prop-types";
import {useDrag} from "react-dnd";
import {useSelector} from "react-redux";
import {IngredientDetails} from "../ingredient-details/ingredient-details";
import {ingredientTypes} from "../../constants";

export const IngredientItem = ({data}) => {
    const {name, image, price} = data;

    const selectedIngredients = useSelector(store => store.burger.selectedIngredients);

    const [modalIsActive, setModalActive] = useState(false);

    const [{isDrag}, dragRef] = useDrag({
        type: 'ingredient',
        item: data,
        collect: monitor => ({
            isDrag: monitor.isDragging()
        })
    })
    const opacity = isDrag ? 0.5 : 1;

    const count = selectedIngredients.filter(i => i._id === data._id).length
        * (data.type === ingredientTypes.bun.key ? 2 : 1)

    const toggleIngredient = () => {
        setModalActive(true)
    }

    return (
        <>
            <div className={style['ingredient-item']}
                 onClick={toggleIngredient}
                 ref={dragRef} style={{opacity}}>
                <img src={image} alt={name}/>
                <span>
                    <span>{price}</span>
                    <CurrencyIcon type="primary"/>
                </span>
                <span className="text text_type_main-small">{name}</span>
                {count > 0 && <Counter count={count} size="default"/>}
            </div>
            {modalIsActive && (
                <Modal header="Детали ингредиента" setModalActive={setModalActive}>
                    <IngredientDetails data={data}/>
                </Modal>
            )}
        </>
    );
}

IngredientItem.propTypes = {
    data: PropTypes.shape({
        name: PropTypes.string.isRequired,
        image: PropTypes.string.isRequired,
        price: PropTypes.number.isRequired
    }).isRequired
};
export default IngredientItem;
