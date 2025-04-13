import style from "./style.module.css"
import {NavLink, useNavigate} from "react-router-dom";
import React from "react";
import {useDispatch} from 'react-redux';
import {logoutAction} from "../../services/reducers/auth";
import {AppDispatch} from "../../utils/types";

export const Links: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();

    const handleExit = () => {

        dispatch(logoutAction());
        navigate({ pathname: '/login' })
        localStorage.clear()
    }

    return (
        <nav className={style.nav_list + ' pt-5 mb-20'}>

            <NavLink
                to="/profile"
                className={({ isActive }) =>
                    `${style.link} text text_type_main-medium text_color_inactive ${isActive ? style.link_active : ''}`
                }
            >
                <span className="ml-2 pu-5 pb-5">Профиль</span>
            </NavLink>

            <NavLink to="/profile/orders"
                     className={({ isActive }) =>
                         `${style.link} text text_type_main-medium text_color_inactive ${isActive ? style.link_active : ''}`
                     }>
                <span className='ml-2 pu-5 pb-5'>История заказов</span>
            </NavLink>
            <NavLink to="/login"
                     className={({ isActive }) =>
                         `${style.link} text text_type_main-medium text_color_inactive ${isActive ? style.link_active : ''}`
                     }>
                <span className='ml-2 pu-5 pb-5' onClick={handleExit}>Выход</span>
            </NavLink>

            <div className="pt-20">
                <span className="text text_type_main-default text_color_inactive">
                    В этом разделе вы можете изменить свои персональные данные
                </span>
            </div>
        </nav>
    )
}
