export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
  reviews: Array<{ body: string; rating: number }>;
}
