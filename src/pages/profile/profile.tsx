import React, {useState, useEffect, ChangeEvent, FormEvent} from "react";
import {Input, Button} from "@ya.praktikum/react-developer-burger-ui-components";
import style from "./style.module.css";
import {Links} from "./links";
import {getUser, updateUser} from "../../services/reducers/auth";
import {TUser} from "../../utils/types";
import {useAppDispatch, useAppSelector} from "../../services/store";

export const ProfilePage: React.FC = () => {
    const dispatch = useAppDispatch();
    const initState: TUser & { password: string } = {
        name: "",
        email: "",
        password: ""
    }
    const [state, setState] = useState(initState);
    const user = useAppSelector(store => store.auth.user);
    const accessToken = useAppSelector(store => store.auth.accessToken);

    useEffect(() => {
        dispatch(getUser(localStorage.getItem('accessToken')))
    }, [])

    useEffect(() => {
        setState({
            ...state,
            ...user
        });
    }, [user]);

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        const target = e.target;
        setState({
            ...state,
            [target.name]: target.value
        });
    }
    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        dispatch(updateUser({
            ...state,
            token: accessToken
        }))
    }

    const handleReset = (e: FormEvent) => {
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
                    {/*@ts-ignore*/}
                    <Input
                        type={"text"}
                        placeholder={"Имя"}
                        onChange={handleInputChange}
                        icon={"EditIcon"}
                        name={"name"}
                        value={state.name ?? ''}
                        size={"default"}
                    />
                    {/*@ts-ignore*/}
                    <Input
                        type={"email"}
                        placeholder={"Email"}
                        onChange={handleInputChange}
                        icon={"EditIcon"}
                        name={"email"}
                        value={state.email ?? ''}
                        size={"default"}
                    />
                    {/*@ts-ignore*/}
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
