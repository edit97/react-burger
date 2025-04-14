import React, {FormEvent, useLayoutEffect, useState} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import {Input, Button} from '@ya.praktikum/react-developer-burger-ui-components';
import style from './style.module.css';
import {forgotPassword} from "../../services/reducers/auth";
import {useAppDispatch, useAppSelector} from "../../services/store";

export const ForgotPasswordPage = () => {
    const [email, setEmail] = useState<string>('');
    let navigate = useNavigate();
    const dispatch = useAppDispatch();
    const authorized = useAppSelector(store => store.auth.isLoggedIn);

    useLayoutEffect(() => {
        if (authorized) {
            navigate({pathname: '/'});
        }
    }, [])

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();

        (dispatch(forgotPassword({ email })) as unknown as Promise<any>)
            .then(() => {
                navigate({pathname: '/reset-password'});
            })
    }

    return (
        <div className={style.login_box}>
            <form className={style.login_fields} onSubmit={handleSubmit}>
                <h3 className="text text_type_main-medium">Восстановление пароля</h3>
                {<Input type={"email"}
                        placeholder={"Укажите e-mail"}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
                        value={email}
                        onPointerEnterCapture={() => {}}
                        onPointerLeaveCapture={() => {}}/> }
                <Button htmlType="submit">
                    <p className="text">Восстановить</p>
                </Button>
            </form>
            <div className={style.login_text}>
                <span className="text text_type_main-default text_color_inactive">Вспомнили пароль?
                <Link to="/login" className="text text_type_main-default pl-2">Войти</Link>
                </span>
            </div>
        </div>);

}
