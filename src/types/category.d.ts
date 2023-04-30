export interface Category {
  Id: number;
  Name: string;
}

export interface Hero {
  Id: number;
  Name: string;
  Active: boolean;
  Category: Category;
}

export interface CreateCategory {
  Name: string;
}

export interface CategoryData {
  Total: number;
  Items: Category[];
}

export interface CategoryForm {
  Name: string;
}

export interface TableColumn {
  key: string;
  label: string;
}
