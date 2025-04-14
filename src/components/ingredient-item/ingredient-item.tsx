import {FC} from "react";
import style from './style.module.css';
import {CurrencyIcon, Counter} from '@ya.praktikum/react-developer-burger-ui-components';
import {DragSourceMonitor, useDrag} from "react-dnd";
import {useLocation, useNavigate} from "react-router-dom";
import {ingredientTypes} from "../../constants";
import {TIngredient} from "../../utils/types";
import {useAppSelector} from "../../services/store";

type IngredientItemProps = {
    data: TIngredient;
};

export const IngredientItem: FC<IngredientItemProps> = ({data}) => {
    const {name, image, price} = data;

    const navigate = useNavigate();
    let location = useLocation();

    const selectedIngredients = useAppSelector(store => store.burger.selectedIngredients);


    const [{isDrag}, dragRef] = useDrag({
        type: 'ingredient',
        item: data,
        collect: (monitor: DragSourceMonitor) => ({
            isDrag: monitor.isDragging()
        })
    })
    const opacity = isDrag ? 0.5 : 1;

    const count = selectedIngredients.filter((i:TIngredient) => i._id === data._id).length
        * (data.type === ingredientTypes.bun.key ? 2 : 1)

    const toggleIngredient = () => {
        navigate(`/ingredients/${data._id}`, {state: {background: location}})
    }

    return (
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
    );
}

export default IngredientItem;
