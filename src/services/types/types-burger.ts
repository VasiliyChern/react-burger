export type TIngredientType = {
  readonly _id: string;
  readonly name: string;
  readonly type: string;
  readonly proteins: number;
  readonly fat: number;
  readonly carbohydrates: number;
  readonly calories: number;
  readonly price: number;
  readonly image: string;
  readonly image_mobile: string;
  readonly image_large: string;
  readonly __v: number;
};

export type TIngredientReducerType = TIngredientType & {id: string};

export type TIngredientPosition = {
  [name: string]: number;
}

export type TwsOrderType = {
  ingredients: Array<string>,
  _id: string,
  status: 'done' | 'created' | 'pending',
  number: number,
  createdAt: string,
  updatedAt: string,
  name: string
}