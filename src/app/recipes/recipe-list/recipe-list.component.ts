import { Component, OnInit } from '@angular/core';
import { Recipe } from '../recipe.model';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrl: './recipe-list.component.css',
})
export class RecipeListComponent implements OnInit {
  ngOnInit(): void {}
  recipes: Recipe[] = [
    new Recipe(
      'Basic Crêpes',
      'This simple but delicious crêpe recipe can be made in minutes from ingredients that everyone has on hand.',
      'https://www.allrecipes.com/thmb/p1mPvCVGnd6cy3SGmZAIHEoSI2Y=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/16383-basic-crepes-mfs_003-f1033a4dbed74bc2b0d465c8de6026e2.jpg'
    ),
    new Recipe(
      'French Crêpes',
      'French crêpes are good for weekend breakfasts, or even for desserts. Serve rolled up and filled with jam or fruit and whipped cream.',
      'https://imagesvc.meredithcorp.io/v3/mm/image?url=https%3A%2F%2Fpublic-assets.meredithcorp.io%2Fab8c0f42ec7fb37f95c736214abc7e6f%2F165705069620220705_125229.jpg&q=60&c=sc&orient=true&poi=auto&h=512'
    ),
    new Recipe(
      'Creamy Strawberry Crepes',
      'This strawberry crepe recipe has been a family favorite for over 30 years! These crepes are delicious and very rich! Be sure you have at least 1 hour to prepare them; they are worth every minute!',
      'https://www.allrecipes.com/thmb/3zQFQdtmZMsRS3QJADaXEZCfNj0=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/7725389-creamy-strawberry-crepes-Christine-Johanson-1x1-1-775b425615bd408698fc3688b35ddf12.jpg'
    ),
  ];
}
