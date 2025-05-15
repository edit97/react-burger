/*-----------TYPES--------------*/
import store from "../services/store";

export type TIngredient = {
    _id: string;
    name: string;
    type: 'bun' | 'sauce' | 'main';
    proteins: number;
    fat: number;
    carbohydrates: number;
    calories: number;
    price: number;
    image: string;
    image_mobile: string;
    image_large: string;
    __v?: number;
    productId: string;
    id?: string | undefined;
}

export type TUser = {
    name: string;
    email: string;
}
export type IRegisterUser = {
    email: string;
    name: string;
    password: string;
}

/*-----------Redux types--------*/
export type TBurgerStore = {
    ingredients: TIngredient[],
    selectedIngredients: TIngredient[],
    totalAmount: number,
}

export type TAuthStore = {
    login: false,
    user: TUser,
    isLoggedIn: false,
    refreshToken: '',
    accessToken: '',
    failedAuth: false,
}
export type TOrderStore = {
    order: null | { number: number },
}

export type TReduxStore = {
    burger: TBurgerStore
    auth: TAuthStore
    order: TOrderStore

}

export type TIngredientWithUUID = Omit<TIngredient, 'id'> & {
    id?: string;
};

export type AppDispatch = typeof store.dispatch;
