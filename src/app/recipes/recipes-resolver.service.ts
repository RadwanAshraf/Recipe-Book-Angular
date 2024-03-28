import { inject, Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Params,
  ResolveFn,
  RouterStateSnapshot,
} from '@angular/router';
import { Observable } from 'rxjs';
import { Recipe } from './recipe.model';
import { RecipeService } from '../service/recipe.service';
import { Console } from 'console';
import { Router } from 'express';

Injectable({
  providedIn: 'root',
});
export const recipeResolver: ResolveFn<any> = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
): Observable<Recipe[]> | Promise<Recipe[]> | Recipe[] => {
  const recipeService = inject(RecipeService).getRecipes();
  const index = route.params['id'];
  /* if (index > recipeService.length) {
    console.log('Resolver injected');

  }*/
  return recipeService;
};
