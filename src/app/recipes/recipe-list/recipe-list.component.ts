import { Component, ElementRef, OnDestroy, OnInit } from '@angular/core';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../../service/recipe.service';
import { ActivatedRoute, Router } from '@angular/router';
import { relative } from 'path';
import { Subscription } from 'rxjs';
import { DataStorageService } from '../../Shared/data-storage.service';
@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrl: './recipe-list.component.css',
})
export class RecipeListComponent implements OnInit ,OnDestroy{
  recipes!: Recipe[];
  subscription!:Subscription;

  constructor(
    private recipeService: RecipeService,
    private router: Router,
    private route: ActivatedRoute,
    private dataStorage: DataStorageService
  ) {}
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
  ngOnInit() {
   this.subscription= this.recipeService.recipesChanged.subscribe((newRecipes: Recipe[]) => {
      this.recipes = newRecipes;
      console.log('update');
    });
    this.dataStorage.fetchRecipes();
    this.recipes = this.recipeService.getRecipes();
  }
  onNewRecipe() {
    this.router.navigate(['new'], { relativeTo: this.route });
  }
}
