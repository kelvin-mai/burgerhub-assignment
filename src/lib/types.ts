export type APIProduct = {
  id: string;
  slug: string;
  name: string;
  calorie: number;
  description: string;
  image: string;
  price: number;
};

export type CartItem = {
  product: APIProduct;
  quantity: number;
};
