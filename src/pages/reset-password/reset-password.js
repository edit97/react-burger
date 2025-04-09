import React, { useLayoutEffect} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import {Input, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import style from './reset-password.module.css';
import {useDispatch, useSelector} from 'react-redux';
import {resetPassword} from "../../services/reducers/auth";

export const ResetPasswordPage = () => {
    const [password, setPassword] = React.useState('');
    const [token, setToken] = React.useState('');

    let navigate = useNavigate();
    const dispatch = useDispatch();

    const authorized = useSelector(store => store.auth.authorized);

    useLayoutEffect(() => {
        if (authorized) {
            navigate({pathname: '/'});
        }
    }, [])

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(resetPassword({password, token}))
            .then(()=>{
                navigate({pathname: '/login'})
            })
    }

    return <div className={style.login_box}>
        <form className={style.login_fields} onSubmit={handleSubmit}>
            <h3 className="text text_type_main-medium">Восстановление пароля</h3>
            <Input type={"password"} placeholder={"Введите новый пароль"} value={password}
                   onChange={(event) => setPassword(event.target.value)}/>
            <Input type={"text"} placeholder={"Введите код из письма"} value={token}
                   onChange={(event) => setToken(event.target.value)}/>

            <Button htmlType="submit">
                <p className="text ">Сохранить</p>
            </Button>
        </form>
        <div className={style.login_text}>
                    <span className="text text_type_main-default text_color_inactive">Вспомнили пароль?
                        <Link to="/login" className="text text_type_main-default pl-2">Войти</Link>
                    </span>
        </div>
    </div>
}
