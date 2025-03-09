import React, {useState} from 'react';
import style from './style.module.css';
import {Button, ConstructorElement, CurrencyIcon} from '@ya.praktikum/react-developer-burger-ui-components';
import {Modal} from "../modal/modal";
import {useDrop} from 'react-dnd';
import {useDispatch, useSelector} from 'react-redux';
import BurgerItem from "../burger-item/burger-item";
import {ingredientTypes} from "../../constants";
import {moveSelectedIngredient} from "../../services/reducers";
import {OrderDetails} from "../order-details/order-details";
import {createOrder} from "../../services/api";

const BurgerConstructor = ({onDropHandler}) => {
    const {selectedIngredients} = useSelector(store => store.burger);
    const dispatch = useDispatch();

    const [modalIsActive, setModalActive] = useState(false);
    const [{canDrop}, dropTarget] = useDrop({
        accept: "ingredient",
        drop(itemId) {
            onDropHandler(itemId);
        },
        collect: monitor => ({
            isHover: monitor.isOver(),
            canDrop: monitor.canDrop(),
        })
    });


    const bun = selectedIngredients?.find(i => i.type === ingredientTypes.bun.key)

    const getTotalPrice = () => {
        return selectedIngredients.reduce((total, item) =>
            total + (item.price ? (item.type === 'bun' ? item.price * 2 : item.price) : 0), 0);
    }
    const handleClick = () => {
        setModalActive(true)
        dispatch(createOrder(selectedIngredients))
    }
    const handleMove = (from, to) => {
        dispatch(moveSelectedIngredient({from, to}));
    }

    return (
        <div ref={dropTarget} style={{opacity: canDrop ? 0.5 : 1}}>
            <div className={canDrop ? style.drop_msg : style.no_drop_msg}>
                Переместите сюда ингредиент для добавления в заказ
            </div>

            {bun &&
                <div className="ml-15">
                    <ConstructorElement
                        text={bun.name + " (Верх)"}
                        isLocked={true}
                        price={bun.price}
                        thumbnail={bun.image}
                        type="top"
                    />
                </div>
            }
            <div className={style.list}>
                <ul>
                    {selectedIngredients?.filter(i => i.type !== ingredientTypes.bun.key)?.map((item, i) => {
                        return (
                            <BurgerItem
                                key={item.id}
                                item={item}
                                isLocked={false}
                                handleMove={handleMove}
                                index={i}
                            />
                        )
                    })
                    }</ul>
            </div>
            {bun &&
                <div className="ml-15">
                    <ConstructorElement
                        text={bun.name + " (Низ)"}
                        isLocked={true}
                        price={bun.price}
                        thumbnail={bun.image}
                        type="bottom"
                    />
                </div>
            }
            <div className={style.total}>
                <p className="text text_type_digits-medium">{getTotalPrice()}</p>
                <CurrencyIcon type="primary"/>
                {bun && <Button htmlType="button" size="medium" onClick={handleClick}>Оформить заказ</Button>}
                {modalIsActive && <Modal setModalActive={setModalActive}>
                    <OrderDetails/>
                </Modal>}
            </div>

        </div>
    );
}
export default BurgerConstructor;
