import React, {useState, useEffect, useLayoutEffect} from "react";
import {Input, Button} from "@ya.praktikum/react-developer-burger-ui-components";
import style from "./style.module.css";
import {useDispatch, useSelector} from "react-redux"
import {Links} from "./links";
import {getUser, updateUser} from "../../services/reducers/auth";

export const ProfilePage = () => {
    const dispatch = useDispatch();
    const initState = {
        name: "",
        email: "",
        password: ""
    }
    const [state, setState] = useState(initState);
    const user = useSelector(store => store.auth.user);
    const accessToken = useSelector(store => store.auth.accessToken);

    useLayoutEffect(() => {
        dispatch(getUser(accessToken))
    },[])

    useEffect(() => {
        setState({
            ...state,
            ...user
        });
    }, [user]);

    const handleInputChange = (e) => {
        const target = e.target;
        setState({
            ...state,
            [target.name]: target.value
        });
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(updateUser({
            ...state,
            token: accessToken
        }))
    }

    const handleReset = (e) => {
        e.preventDefault();
        setState({
            ...initState,
            ...user
        });
    }

    return (
        <div className={style.profile_main + " pt-20"}>
            <div className={style.profile_col}>
                <Links/>
            </div>
            <div className={style.profile_col}>
                <form className={style.profile_form} onSubmit={handleSubmit}>
                    <Input
                        type={"text"}
                        placeholder={"Имя"}
                        onChange={handleInputChange}
                        icon={"EditIcon"}
                        name={"name"}
                        value={state.name ?? ''}
                        size={"default"}
                    />
                    <Input
                        type={"email"}
                        placeholder={"Email"}
                        onChange={handleInputChange}
                        icon={"EditIcon"}
                        name={"email"}
                        value={state.email ?? ''}
                        size={"default"}
                    />
                    <Input
                        type={"password"}
                        placeholder={"Пароль"}
                        onChange={handleInputChange}
                        icon={"EditIcon"}
                        name={"password"}
                        value={state.password ?? ''}
                        size={"default"}
                    />
                    <Button htmlType="submit">
                        <p className="text">Сохранить</p>
                    </Button>
                    <Button htmlType="button" onClick={handleReset}>
                        <p className="text">Отмена</p>
                    </Button>
                </form>
            </div>
        </div>);

}
