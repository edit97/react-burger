export type IngredientKey = 'bun' | 'sauce' | 'main';

export type IngredientType = {
    name: string;
    key: IngredientKey;
};

export const ingredientTypes: Record<IngredientKey, IngredientType>  = {
    bun: {name: 'Булки', key: 'bun'},
    sauce: {name: 'Соусы', key: 'sauce'},
    main: {name: 'Начинки', key: 'main'}
}
