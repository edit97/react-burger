import React, {useRef, useState} from 'react';
import {Tab} from '@ya.praktikum/react-developer-burger-ui-components';
import style from './style.module.css';
import cs from 'classnames';
import {useSelector} from "react-redux";
import IngredientList from "../ingredient-list/ingredient-list";
import {IngredientKey, ingredientTypes} from "../../constants";
import {TReduxStore} from "../../utils/types";

export const BurgerIngredients: React.FC = () => {
    const [selectedIngredientType, setSelectedIngredientType] = useState('bun');
    const ingredients = useSelector((store: TReduxStore) => store.burger.ingredients);

    const wrapperRef = useRef<HTMLUListElement  | null>(null);
    const bunRef = useRef<HTMLParagraphElement | null>(null);
    const sauceRef = useRef<HTMLParagraphElement | null>(null);
    const mainRef = useRef<HTMLParagraphElement | null>(null);

    function filterIngredients(type: string) {
        return (ingredients?.length && type) ? ingredients?.filter((i) => i.type === type && i) : []
    }

    function changeTab(tab:string) {
        setSelectedIngredientType(tab);
        const element = document.getElementById(tab);
        if (element) element.scrollIntoView({behavior: "smooth"});
    }

    const handleScroll = () => {
        if (wrapperRef.current && bunRef.current && sauceRef.current && mainRef.current) {
            const wrapperTop = wrapperRef.current.getBoundingClientRect().top;
            const bunDistance = Math.abs(wrapperTop - bunRef.current.getBoundingClientRect().top);
            const sauceDistance = Math.abs(wrapperTop - sauceRef.current.getBoundingClientRect().top);
            const mainDistance = Math.abs(wrapperTop - mainRef.current.getBoundingClientRect().top);

            const minDistance = Math.min(bunDistance, sauceDistance, mainDistance);
            const currentTab =
                minDistance === bunDistance
                    ? ingredientTypes.bun.key
                    : minDistance === sauceDistance
                        ? ingredientTypes.sauce.key
                        : ingredientTypes.main.key;

            if (currentTab !== selectedIngredientType) {
                setSelectedIngredientType(currentTab);
            }
        }
    }

    return (
        <div className={style['ingredient-list']}>
            <h2 className={cs(style['ingredients-title'], 'pt-10 pb-5')}>
                Соберите бургер</h2>
            <div className={`${style['burger-ingredients-tabs']} custom-scroll`}>
                {(Object.keys(ingredientTypes) as IngredientKey[])?.map((type) => (
                    <Tab
                        key={type}
                        active={selectedIngredientType === type}
                        value={type}
                        onClick={(type) => {
                            changeTab(type);
                        }}
                    >
                        {ingredientTypes[type].name}
                    </Tab>
                ))}
            </div>
            <ul
                ref={wrapperRef}
                onScroll={handleScroll}
                className={style['ingredients-list-wrapper']}
            >

                <IngredientList title={ingredientTypes.bun.name}
                                data={filterIngredients(ingredientTypes.bun.key)}
                                subRef={bunRef}
                                id={ingredientTypes.bun.key}/>
                <IngredientList title={ingredientTypes.sauce.name}
                                data={filterIngredients(ingredientTypes.sauce.key)}
                                subRef={sauceRef}
                                id={ingredientTypes.sauce.key}/>
                <IngredientList title={ingredientTypes.main.name}
                                data={filterIngredients(ingredientTypes.main.key)}
                                subRef={mainRef}
                                id={ingredientTypes.main.key}/>

            </ul>
        </div>
    );
}
