import React, {useState} from 'react';
import style from './style.module.css';
import {Button, ConstructorElement, CurrencyIcon} from '@ya.praktikum/react-developer-burger-ui-components';
import {Modal} from "../modal/modal";
import {useDrop} from 'react-dnd';
import BurgerItem from "../burger-item/burger-item";
import {ingredientTypes} from "../../constants";
import {clearSelectedIngredient, createOrder, moveSelectedIngredient} from "../../services/reducers";
import {OrderDetails} from "../order-details/order-details";
import {useNavigate} from "react-router-dom";
import {TIngredient} from "../../utils/types";
import {useAppDispatch, useAppSelector} from "../../services/store";

type BurgerConstructorProps = {
    onDropHandler: (item: TIngredient) => void;
}

type DragItem = {
    id: string;
    type: string;
}

const BurgerConstructor: React.FC<BurgerConstructorProps> = ({onDropHandler}) => {
    const selectedIngredients = useAppSelector(store => store.burger.selectedIngredients);
    const accessToken = useAppSelector(store => store.auth.accessToken);

    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const [modalIsActive, setModalActive] = useState(false);
    const [{canDrop}, dropTarget] =  useDrop<DragItem, void, { canDrop: boolean }>({
        accept: "ingredient",
        drop(item) {
            onDropHandler(item as unknown as TIngredient);
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

    const handleClick = async () => {
        if (accessToken) {
            try {
                setModalActive(true)
                await dispatch(createOrder(selectedIngredients) as any);

                // @ts-ignore
                dispatch(clearSelectedIngredient())
            } catch (error) {
                console.error(error);
            }
        }else {
            navigate('/login', { state: { from: '/' } });
        }
    }

    const handleMove = (from:number, to:number) => {
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
                    {selectedIngredients?.filter((i:TIngredient) => i.type !== ingredientTypes.bun.key)?.map((item, i) => {
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
                {modalIsActive && <Modal  onClose={() => {
                    navigate(-1)
                }}>
                    <OrderDetails/>
                </Modal>}
            </div>

        </div>
    );
}
export default BurgerConstructor;
