export interface Recipe {
  id: number;
  title: string;
  image: string;
  category?: string;
  ingredients: string[];
  instructions: string[];
}
