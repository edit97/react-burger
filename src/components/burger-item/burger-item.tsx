import React, {FC} from 'react';
import style from './style.module.css'
import {ConstructorElement, DragIcon} from  '@ya.praktikum/react-developer-burger-ui-components';
import { useRef } from 'react';
import { useDrag, useDrop, DropTargetMonitor } from 'react-dnd';
import {useDispatch} from "react-redux";
import {deleteSelectedIngredient} from "../../services/reducers";
import {TIngredientWithUUID} from "../../utils/types";

type BurgerItemProps = {
    item: TIngredientWithUUID;
    index: number;
    isLocked: boolean;
    handleMove: (from: number, to: number) => void;
};

type DragItem = {
    id: string;
    index: number;
};

export const BurgerItem: FC<BurgerItemProps> = ({item, index, isLocked, handleMove}) => {
    const dispatch = useDispatch();


    const id    = item._id
    const ref = useRef<HTMLLIElement>(null);
    const [, drop] = useDrop<DragItem, void, unknown>({
        accept: 'item',

        collect(monitor) {
            return {
                handlerId: monitor.getHandlerId(),
            };
        },
        hover(el: DragItem, monitor: DropTargetMonitor) {
            if (!ref.current) return;

            const dragIndex = el.index;
            const hoverIndex = index;

            if (dragIndex === hoverIndex) return;

            const hoverRect = ref.current.getBoundingClientRect();
            const hoverMidY = (hoverRect.bottom - hoverRect.top) / 2;

            const clientOffset = monitor.getClientOffset();
            if (!clientOffset) return;

            const hoverClientY = clientOffset.y - hoverRect.top;

            if (dragIndex < hoverIndex && hoverClientY < hoverMidY) return;
            if (dragIndex > hoverIndex && hoverClientY > hoverMidY) return;

            handleMove(dragIndex, hoverIndex);
            el.index = hoverIndex;
        },
    });

    const [{ isDrag }, drag] = useDrag<DragItem, void, { isDrag: boolean }>({
        type: 'item',
        item: () => {
            return { id, index };
        },
        collect: (monitor) => ({
            isDrag: monitor.isDragging(),
        }),
    });

    drag(drop(ref))

    function handleDelete() {
        dispatch(deleteSelectedIngredient({id: item.id}));
    }

    return (
        <li ref={ ref } className={ style.burger_item } style={{ opacity: isDrag ? 0 : 1 }}>
            <DragIcon type='primary' />
            <ConstructorElement
                text={item.name}
                price={item.price}
                isLocked={isLocked}
                thumbnail={item.image}
                handleClose={handleDelete}
            />
        </li>
    );
};

export default BurgerItem;
