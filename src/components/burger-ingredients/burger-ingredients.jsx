import React, {useRef, useEffect} from 'react';
import {Tab} from '@ya.praktikum/react-developer-burger-ui-components';
import style from './style.module.css';
import {ingredientType} from '../../prop-types';
import PropTypes from "prop-types";
import {useSelector} from "react-redux";
import IngredientList from "./burger-ingredients/ingredient-list";

export const BurgerIngredients = () => {
    const [current, setCurrent] = React.useState('bun');
	const apiData = useSelector(store => store.data);
	const setTab = (tab) => {
		setCurrent(tab);
		const element = document.getElementById(tab);
		if (element) element.scrollIntoView({ behavior: "smooth" });
	};
	const listBun = apiData.filter((itm)=>itm.type==='bun' && itm);
	const listMain= apiData.filter((itm)=>itm.type==='main'&& itm);
	const listSauce=apiData.filter((itm)=>itm.type==='sauce' && itm);
	const primaryRef = useRef(null);
	const bunRef = useRef(null);
	const sauceRef = useRef(null);
	const mainRef = useRef(null);

	const handleScroll = () => {
		const bunDistance = Math.abs(primaryRef.current.getBoundingClientRect().top - bunRef.current.getBoundingClientRect().top)
		const sauceDistance = Math.abs(primaryRef.current.getBoundingClientRect().top - sauceRef.current.getBoundingClientRect().top)
		const mainDistance = Math.abs(primaryRef.current.getBoundingClientRect().top - mainRef.current.getBoundingClientRect().top)
		const minDistance = Math.min(bunDistance, sauceDistance, mainDistance);
		const currentHeader = minDistance === bunDistance ? 'bun' : minDistance === sauceDistance ? 'sauce' : 'main';
		setCurrent(prevState => (currentHeader === prevState.current ? prevState.current : currentHeader))
	}
	useEffect(() => {
		document.querySelector(`#${current}`).scrollIntoView();
	},[current])

    return (
        <div className={style.column}>
            <p className="text text_type_main-large">
                Соберите бургер
            </p>
            <div style={{ display: 'flex' }}>
                <Tab value="bun" active={current === 'bun'} onClick={setTab}>Булки</Tab>
	            <Tab value="main" active={current === 'main'} onClick={setTab}>Начинки</Tab>
                <Tab value="sauce" active={current === 'sauce'} onClick={setTab}>Соусы</Tab>
            </div>
            <div className={style.content} ref={primaryRef} onScroll={handleScroll} >
	            <IngredientList apiData={listBun} id={'bun'} subRef={bunRef}>Булки</IngredientList>
	            <IngredientList apiData={listMain} id={'main'} subRef={mainRef}>Начинки</IngredientList>
	            <IngredientList apiData={listSauce} id={'sauce'} subRef={sauceRef} >Соусы</IngredientList>
            </div>

        </div>
    );
}
BurgerIngredients.propTypes = {
	apiData: PropTypes.arrayOf(ingredientType)
};
