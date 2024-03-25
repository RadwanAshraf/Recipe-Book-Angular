import { Component, Output,EventEmitter } from "@angular/core";
import { DataStorageService } from "../Shared/data-storage.service";

@Component({
    selector:'app-header',
    templateUrl:'./header.component.html'
})
export class HeaderComponent{
  constructor(private dataStorageService:DataStorageService) {

  }
    collapsed = true;
    @Output() featureSelected = new EventEmitter<string>();
    onSelect(feature:string){
        this.featureSelected.emit(feature);
    }

    onSaveResipes(){
      this.dataStorageService.storeRecipes();
    }
}
