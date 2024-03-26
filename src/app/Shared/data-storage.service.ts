import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Recipe } from '../recipes/recipe.model';
import { RecipeService } from '../service/recipe.service';
import { response } from 'express';
import { Ingredient } from './ingredient.model';
import { map } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class DataStorageService {
  url = 'https://recipe-book-2eae5-default-rtdb.firebaseio.com/recipes.json';
  constructor(private http: HttpClient, private recipeService: RecipeService) {}

  storeRecipes() {
    const recipes = this.recipeService.getRecipes();
    this.http.put(this.url, recipes).subscribe((responce) => {
      console.log(responce);
    });
  }
  fetchRecipes() {
    return this.http
      .get<Recipe[]>(this.url)
      .pipe(
        map((recipes) => {
          return recipes.map((recipe) => {
            return {
              ...recipe,
              ingredient: recipe.ingredients ? recipe.ingredients : [],
            };
          });
        })
      )
      .subscribe((response) => {
        this.recipeService.setRecipes(response);
      });
  }
}
