import React, {useState} from 'react';
import {useDispatch} from 'react-redux';
import {Link, useNavigate} from 'react-router-dom';
import { Input, PasswordInput, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import style from './style.module.css';
import {registerUser} from "../../services/reducers/auth";

export const RegisterPage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({name:'',email:'',password:''});
    const fieldChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name] : e.target.value
        })
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
       await dispatch(registerUser(formData))
            .then(() => navigate({ pathname: '/login' }));
    };

    return (
        <>
            <div className={style.reg_box}>
                <form className={style.reg_fields} onSubmit={handleSubmit}>
                    <h3 className="text text_type_main-medium" >Регистрация</h3>
                    <Input name={'name'} value={formData.name} onChange={fieldChange} type={"text"} placeholder={"Имя"}/>
                    <Input name={'email'} value={formData.email} onChange={fieldChange} type={"email"} placeholder={"E-mail"}/>
                    <PasswordInput onChange={fieldChange} value={formData.password} name={'password'}/>

                    <Button htmlType="submit">
                        <p className="text ">Зарегистрироваться</p>
                    </Button>
                </form>
            </div>
            <div className={style.reg_text}>
                <span className="text text_type_main-default text_color_inactive">Уже зарегистрированы?
                    <Link to="/login" className="text text_type_main-default pl-2">Войти</Link>
                </span>
            </div>

        </>)
}
