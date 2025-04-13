import {FC, RefObject} from "react";
import style from './style.module.css';
import IngredientItem from "../ingredient-item/ingredient-item";
import {TIngredient} from "../../utils/types";

type IngredientListProps = {
    id: string;
    title: string;
    data: TIngredient[];
    subRef: RefObject<HTMLParagraphElement>;
};

export const IngredientList: FC<IngredientListProps> = ({data, subRef, id, title}:IngredientListProps) => {
    return (
        <>
            <p className="" id={id} ref={subRef}>
                {title}
            </p>
            <div className={style.ingredient_list}>
                {data?.length && data?.map((item: TIngredient) => {
                    return <IngredientItem key={item._id} data={item}/>
                })}
            </div>
        </>
    );
}

export default IngredientList;
