import axios from 'axios';
import { makeAutoObservable } from 'mobx';

export type Recipe = {
  id: number;
  title: string;
  description: string;
  authorId: number;
  ingredients: [];
  instructions: string;
};

class RecipeStore {
  recipes: Recipe[] = [];
  selectedRecipe: Recipe | null = null;
  
  constructor() {
    makeAutoObservable(this);
  }

  async addRecipe(recipe: Omit<Recipe, "id" | "authorId">, authorId: number) {
    try {
      const res = await axios.post(
        "http://localhost:3000/api/recipes/",
        { ...recipe },
        { headers: { "user-id": authorId } }
      );
      alert("successful");
      return res;
    } catch (error: any) {
      throw error; 
    }
  }

  async getRecipe() {
    try {
      const res = await axios.get("http://localhost:3000/api/recipes");
      this.recipes = res.data;
    } catch (error: any) {
      throw error; 
    }
  }

  selectRecipe(recipe: Recipe | null) {
    this.selectedRecipe = recipe;
  }
}

export const recipeStore = new RecipeStore();
