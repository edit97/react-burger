import React, {ChangeEvent, FormEvent, useEffect, useState} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import { Input, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import style from './style.module.css';
import {loginAction} from "../../services/reducers/auth";
import {useAppDispatch, useAppSelector} from "../../services/store";

export const LoginPage: React.FC = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const user = useAppSelector(store => store.auth.user);

    const [state, setState] = useState({
        email:'',
        password:''
    });

    useEffect(()=>{
        if (user.name){
            navigate({ pathname: '/' })
        }
    }, [user])

    const getInputValue = (e: ChangeEvent<HTMLInputElement>) =>{
        setState({
            ...state,
            [e.target.name]:e.target.value
        });
    };

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        dispatch(loginAction(state))
    };

    return (
        <div className={style.login_box}>
            <form className={style.login_fields} onSubmit={handleSubmit}>
                <h3 className="text text_type_main-medium">Вход</h3>

                {/*@ts-ignore*/}
                <Input
                    type={"email"}
                    placeholder={"E-mail"}
                    onChange={getInputValue}
                    name={"email"}
                    value={state.email}
                />

                {/*@ts-ignore*/}
                <Input
                    type={"password"}
                    placeholder={"Пароль"}
                    size={"default"}
                    onChange={getInputValue}
                    name={"password"}
                    value={state.password}
                />
                <Button htmlType="submit" size="small">
                    <p className="text text_type_main-default">Войти</p>
                </Button>
            </form>
            <div className={style.login_text}>
                <span className="text text_type_main-default text_color_inactive">Вы - новый пользователь?
                    <Link to="/register" className="text text_type_main-default pl-2">Зарегистрироваться</Link>
                </span>
                <br/>
                <span className="text text_type_main-default text_color_inactive">Забыли пароль?
                    <Link to="/forgot-password"
                          className="text text_type_main-default pl-2">Восстановить пароль</Link>
                </span>
            </div>
        </div>
    );

}
