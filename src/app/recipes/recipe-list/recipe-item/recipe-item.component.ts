import { Component, ElementRef,Input, OnInit } from '@angular/core';
import { Recipe } from '../../recipe.model';


@Component({
  selector: 'app-recipe-item',
  templateUrl: './recipe-item.component.html',
  styleUrl: './recipe-item.component.css'
})
export class RecipeItemComponent implements OnInit{
  @Input() recipe!:Recipe;
  maxDescriptionLength = 1;
  showFullDescription = false;
  
  ngOnInit(): void {
    console.log(this.recipe);
  }
  
  toggleDescription(recipe:ElementRef) {
        this.showFullDescription = !this.showFullDescription;
        if(this.showFullDescription)
        recipe.nativeElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    
}
