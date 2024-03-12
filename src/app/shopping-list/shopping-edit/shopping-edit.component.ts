import {
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { Ingredient } from '../../Shared/ingredient.model';
import { ShoppingListService } from '../../service/shopping-list.service';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrl: './shopping-edit.component.css',
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  @ViewChild('f') slForm!: NgForm;
  subscription!: Subscription;
  editMode = false;
  editedIngredient!: Ingredient;
  constructor(private slService: ShoppingListService) {}
  ngOnInit(): void {
    this.subscription = this.slService.startedEditing.subscribe(
      (ingredient: Ingredient) => {
        this.editedIngredient = ingredient;
        this.editMode = true;
        this.slForm.setValue({
          name: this.editedIngredient.name,
          amount: this.editedIngredient.amount,
        });
      }
    );
  }

  onAddItem(form: NgForm) {
    const ingredient = form.value;
    const newIngredient = new Ingredient(ingredient.name, ingredient.amount);
    this.slService.addIngredient(newIngredient);
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
