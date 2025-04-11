import React, {useEffect, useState} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import { Input, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import style from './style.module.css';
import {useDispatch,useSelector} from "react-redux";
import {loginAction} from "../../services/reducers/auth";

export const LoginPage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const user = useSelector(store => store.auth.user);

    const [state, setState] = useState({
        email:'',
        password:''
    });

    useEffect(()=>{
        if (user){
            navigate({ pathname: '/' })
        }
    }, [user])

    const getInputValue = (e) =>{
        setState({
            ...state,
            [e.target.name]:e.target.value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(loginAction(state))
    };

    return (
            <div className={style.login_box}>
                <form className={style.login_fields} onSubmit={handleSubmit}>
                    <h3 className="text text_type_main-medium">Вход</h3>
                    <Input
                        type={"email"}
                        placeholder={"E-mail"}
                        onChange={getInputValue}
                        name={"email"}
                        value={state.email}
                    />
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
