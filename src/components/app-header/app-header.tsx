import React from 'react';
import styles from './style.module.css';
import {BurgerIcon, Button, ListIcon, Logo, ProfileIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import {NavLink} from "react-router-dom";

function AppHeader() {
    return (
        <header className={styles.header}>
            <nav className={'pt-4 pb-4'}>
                <ul className={styles['header_list']}>
                    <NavLink to={'/'} className={styles['menu_item']}>
                        <Button htmlType="button"
                                type="secondary"
                                size="large">
                            <BurgerIcon type="primary"/>
                            Конструктор
                        </Button>
                    </NavLink>
                    <NavLink to={'/feed'} className={styles.menu_item}>
                        <Button htmlType="button"
                                type="secondary"
                                size="large">
                            <ListIcon type="primary"/>
                            Лента заказов
                        </Button>
                    </NavLink>
                    <Logo className={styles.project_logo}/>
                    <NavLink to={'/profile'} className={styles.menu_item}>
                        <Button htmlType="button"
                                type="secondary"
                                size="large">
                            <ProfileIcon type="primary"/>
                            Личный кабинет
                        </Button>
                    </NavLink>
                </ul>
            </nav>
        </header>
    );
}

export default AppHeader;
