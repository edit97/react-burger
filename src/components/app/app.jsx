import React, {useEffect} from 'react';
import styles from './style.module.css';
import {BurgerIngredients} from "../burger-ingredients/burger-ingredients";
import BurgerConstructor from "../burger-constructor/burger-constructor";
import {DndProvider} from "react-dnd";
import {HTML5Backend} from "react-dnd-html5-backend";
import AppHeader from "../app-header/app-header";
import {fetchIngredients, setSelectedIngredients} from "../../services/reducers";
import {Route, Routes, useLocation, useNavigate, useNavigationType} from "react-router-dom";
import {LoginPage} from "../../pages/login/login";
import {RegisterPage} from "../../pages/register/register";
import {ForgotPasswordPage} from "../../pages/forgot-password/forgot-password";
import {ResetPasswordPage} from "../../pages/reset-password/reset-password";
import {ProfilePage} from "../../pages/profile/profile";
import {ProtectedRouteElement} from "../protected-route/protected-route";
import {IngredientDetails} from "../ingredient-details/ingredient-details.tsx";
import {Modal} from "../modal/modal";
import {useAppDispatch} from "../../services/store";

export const App = () => {
    const dispatch = useAppDispatch();
    const location = useLocation();
    const navigate = useNavigate();
    const navigationType = useNavigationType();

    const isPageRefresh = navigationType === 'POP';
    const backgroundLocation = location.state?.backgroundPageLocation;

    const currentLocation = backgroundLocation && !isPageRefresh
        ? backgroundLocation
        : location;

    useEffect(() => {
        dispatch(fetchIngredients());
    }, [dispatch]);

    const handleDrop = (item) => {
        dispatch(setSelectedIngredients(item))
    };

    return (
        <div className={styles.main}>
            <AppHeader/>
            <Routes location={currentLocation}>
                <Route path="/" element={
                    <main className={styles.content}>
                        <DndProvider backend={HTML5Backend}>
                            <BurgerIngredients/>
                            <BurgerConstructor onDropHandler={handleDrop}/>
                        </DndProvider>
                    </main>
                }/>
                <Route path='/login' exact={true} element={<LoginPage/>}/>
                <Route path='/register' exact={true} element={<RegisterPage/>}/>
                <Route path='/forgot-password' exact={true} element={<ForgotPasswordPage/>}/>
                <Route path='/reset-password' exact={true} element={<ResetPasswordPage/>}/>
                <Route path="/profile" element={<ProtectedRouteElement element={<ProfilePage/>} anonymous={false}/>}/>
                <Route path="/profile/orders"
                       element={<ProtectedRouteElement element={<ProfilePage/>} anonymous={false}/>}/>
                {
                    <Route path='/ingredients/:id' element={
                        <Modal title="Детали ингредиента"  onClose={() => {
                            navigate(-1)
                        }}>
                            <IngredientDetails/>
                        </Modal>}/>
                }

                <Route path="*" element={<h1>Ошибка 404: страница не найдена</h1>}/>
            </Routes>

        </div>
    );
}

export default App;
