import React, {useRef, useState} from 'react';
import {Tab} from '@ya.praktikum/react-developer-burger-ui-components';
import style from './style.module.css';
import {ingredientType} from '../../prop-types';
import PropTypes from "prop-types";
import cs from 'classnames';
import {useSelector} from "react-redux";
import IngredientList from "../ingredient-list/ingredient-list";
import {ingredientTypes} from "../../constants";

export const BurgerIngredients = () => {
    const [selectedIngredientType, setSelectedIngredientType] = useState('bun');
    const {ingredients} = useSelector(store => store.burger);
    const wrapperRef = useRef(null);
    const bunRef = useRef(null);
    const sauceRef = useRef(null);
    const mainRef = useRef(null);

    function filterIngredients(type) {
        return ingredients?.length && type && ingredients?.filter((i) => i.type === type && i)
    }

    function changeTab(tab) {
        setSelectedIngredientType(tab);
        const element = document.getElementById(tab);
        if (element) element.scrollIntoView({behavior: "smooth"});
    }

    const handleScroll = () => {
        if (wrapperRef?.current) {
            const bunDistance = Math.abs(wrapperRef?.current?.getBoundingClientRect()?.top - bunRef?.current?.getBoundingClientRect()?.top)
            const sauceDistance = Math.abs(wrapperRef.current.getBoundingClientRect().top - sauceRef.current.getBoundingClientRect().top)
            const mainDistance = Math.abs(wrapperRef.current.getBoundingClientRect().top - mainRef.current.getBoundingClientRect().top)
            const minDistance = Math.min(bunDistance, sauceDistance, mainDistance);
            const currentTab = minDistance === bunDistance ? ingredientTypes.bun.key : minDistance === sauceDistance
                ? ingredientTypes.sauce.key : ingredientTypes.main.key;

            setSelectedIngredientType(prevState => (currentTab === prevState.current ? prevState.current : currentTab))
        }
    }


    return (
        <div className={style['ingredient-list']}>
            <h2 className={cs(style['ingredients-title'], 'pt-10 pb-5')}>
                Соберите бургер</h2>
            <div className={`${style['burger-ingredients-tabs']} custom-scroll`}>
                {Object.keys(ingredientTypes)?.map((type) => (
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
BurgerIngredients.propTypes = {
    apiData: PropTypes.arrayOf(ingredientType)
};
