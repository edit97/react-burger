import React, {useState, useCallback} from 'react';
import style from './style.module.css';
import {Button, ConstructorElement, CurrencyIcon} from '@ya.praktikum/react-developer-burger-ui-components';
import {OrderDetails, Modal} from "../modal";
import { useDrop } from 'react-dnd';
import { useSelector, useDispatch } from 'react-redux';
import {MOVE_INGREDIENT, INGREDIENT_DELETE, COUNTER_DOWN} from '../../services/actions';
import BurgerItem from "./burger-item/burger-item";
import {createOrder} from '../../services/actions/order';

export const BurgerConstructor = ({ onDropHandler }) => {
	const dispatch = useDispatch();
    const [modalIsActive, setModalActive] = useState(false);
	const { bun, contentItems } = useSelector(store => store.burgerIngredients);
    const [{ canDrop }, dropTarget] = useDrop({
        accept : "ingredient",
        drop(itemId) {
            onDropHandler(itemId);
        },
        collect: monitor => ({
            isHover: monitor.isOver(),
            canDrop: monitor.canDrop(),
        })
    });
	let opacity,dropMsgCls,column;
	if(canDrop) {
		dropMsgCls = style.drop_msg;
		opacity = 0.5;
		column = style.column_active;
	} else {
		dropMsgCls = style.no_drop_msg;
		opacity = 1;
		column = style.column;
	}
	const moveItem = useCallback((dragIdx, idx) => {
		dispatch({
			type: MOVE_INGREDIENT,
			toIndex: idx,
			fromIndex: dragIdx
		})
	}, [dispatch])

	const orderSum = (bun, items) => {
		let summ = (bun)? bun.price*2 : 0
		if(items) items.map((itm)=>{return summ += itm.price})
		return summ;
	}
	const handleClick = () => {
		let ingredientsArr = [bun._id]; // пусть сервер знает id булки
		for (let itm of contentItems) {
			ingredientsArr.push(itm._id)
		}
		dispatch(createOrder(ingredientsArr)); // redux-thunk
		setModalActive(true)
	}
    return (
        <div className={column} ref={dropTarget} style={{opacity}}>
	        <div className={dropMsgCls}>
	            Переместите сюда ингредиент для добавления в заказ
            </div>
	        {bun &&
	        <div className="ml-15">
		        <ConstructorElement
			        text={bun.name+" (Верх)"}
			        isLocked={true}
			        price={bun.price}
			        thumbnail={bun.image}
			        type="top"
		        />
	        </div>
	        }
	        <div className={style.list}>
		        <ul>
		        {contentItems && contentItems.map((item, i) => {
		            const delFunc = () => {
					        console.log(item)
					        dispatch({
						        type: INGREDIENT_DELETE,
						        id : item.productId
					        })
					        dispatch({
						        type: COUNTER_DOWN,
						        key: item._id,
						        typeItem: item.type
					        })
				        }
			        return (
					        <BurgerItem
						        key={item.productId}
						        item={item}
						        isLocked={false}
						        deleteFunc={delFunc}
						        moveFunc={moveItem}
						        index={i}
					        />
			        )
		        })
		        }</ul>
	        </div>
	        {bun &&
	        <div className="ml-15">
		        <ConstructorElement
			        text={bun.name+" (Низ)"}
			        isLocked={true}
			        price={bun.price}
			        thumbnail={bun.image}
			        type="bottom"
		        />
	        </div>
	        }
            <div className={style.total}>
                <p className="text text_type_digits-medium">{orderSum(bun, contentItems)}</p>
                <CurrencyIcon type="primary"/>
	            {bun && <Button htmlType="primary" size="medium" onClick={handleClick}>Оформить заказ</Button>}
                {modalIsActive && <Modal setModalActive={setModalActive}>
                    <OrderDetails/>
                </Modal>}
            </div>

        </div>
    );
}
export default BurgerConstructor;
