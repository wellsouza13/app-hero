import { IOption } from "@/components/AsyncSelect";

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

  export interface CreateHero {
    CategoryId: number;
    Name: string;
    Active: boolean;
  }
  
  export interface HeroesData {
    Total: number;
    Items: Hero[];
  }

  export interface HeroesForm {
    CategoryId: IOption;
    Name: string;
    Active: boolean;
  }

  export interface TableColumn {
    key: string;
    label: string;
  }