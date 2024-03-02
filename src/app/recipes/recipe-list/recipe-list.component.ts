import { Component, ElementRef, OnInit } from '@angular/core';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../../service/recipe.service';
import { ActivatedRoute, Router } from '@angular/router';
import { relative } from 'path';
@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrl: './recipe-list.component.css',
})
export class RecipeListComponent implements OnInit {
  recipes!: Recipe[];

  constructor(private recipeService: RecipeService, private router:Router, private route:ActivatedRoute) {}
  ngOnInit() {
    this.recipes = this.recipeService.getRecipes();
  }
  onNewRecipe(){
    this.router.navigate(['new'],{relativeTo:this.route})
  }
}
