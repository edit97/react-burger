import React,{useEffect} from 'react';
import styles from './style.module.css';
import {BurgerIngredients} from "../burger-ingredients/burger-ingredients";
import BurgerConstructor from "../burger-constructor/burger-constructor";
import {useDispatch} from "react-redux";
import {DndProvider} from "react-dnd";
import {HTML5Backend} from "react-dnd-html5-backend";
import AppHeader from "../app-header/app-header";
import {fetchIngredients, setSelectedIngredients} from "../../services/reducers";

export const App = () => {
    const dispatch = useDispatch();

    useEffect(()=>{
	    dispatch(fetchIngredients());
    },[dispatch]);

    const handleDrop = (item) => {
        dispatch(setSelectedIngredients(item))
    };

    return (
        <div className={styles.main}>
            <AppHeader/>
            <main className={styles.content}>
	            <DndProvider backend={HTML5Backend}>
                       <BurgerIngredients />
                       <BurgerConstructor onDropHandler={handleDrop} />
	            </DndProvider>
            </main>
        </div>
    );
}

export default App;
