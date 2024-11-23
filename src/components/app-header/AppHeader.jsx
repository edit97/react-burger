import React from 'react';
import styles from './app-header.module.css';
import {BurgerIcon, Button, ListIcon, Logo, ProfileIcon} from "@ya.praktikum/react-developer-burger-ui-components";


function AppHeader() {
    return (
        <header className={styles.header}>
            <div className="">
                <Button htmlType="button"
                        type="secondary"
                        size="large">
                    <BurgerIcon type="primary"/>
                    Конструктор
                </Button>
                <Button htmlType="button"
                        type="secondary"
                        size="large">
                    <ListIcon type="primary"/>
                    Лента заказов
                </Button>
            </div>
            <Logo/>
            <Button htmlType="button"
                    type="secondary"
                    size="large">
                <ProfileIcon type="primary"/>
                Личный кабинет
            </Button>
        </header>
    );
}

export default AppHeader;
