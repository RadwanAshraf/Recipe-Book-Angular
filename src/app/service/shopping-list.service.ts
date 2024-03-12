import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Ingredient } from '../Shared/ingredient.model';

@Injectable({
  providedIn: 'root',
})
export class ShoppingListService {
  ingredientsChanged = new Subject<Ingredient[]>();
  startedEditing = new Subject<Ingredient>();
  private ingredients: Ingredient[] = [
    new Ingredient('Apples', 5),
    new Ingredient('Tomatoes', 2),
    new Ingredient('Banana', 10),
  ];
  constructor() {}
  getIngredients() {
    return this.ingredients.slice();
  }
  getIngredient(index: number) {
    return this.ingredients.at(index);
  }

  addIngredient(ingredient: Ingredient) {
    this.ingredients.push(ingredient);
    this.ingredientsChanged.next(this.ingredients.slice());
  }
  addIngredients(newIngredients: Ingredient[]) {
    this.ingredients.push(...newIngredients);
    this.ingredientsChanged.next(this.ingredients.slice());
  }
}
