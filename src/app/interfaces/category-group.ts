import { Category } from "./category";

export interface CategoryGroup {
  group: {
    id: number;
    name: string;
    color: string;
  };
  categories: Category[];
}
