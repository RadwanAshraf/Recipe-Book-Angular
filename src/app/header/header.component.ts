import {
  Component,
  Output,
  EventEmitter,
  OnInit,
  OnDestroy,
} from '@angular/core';
import { DataStorageService } from '../Shared/data-storage.service';
import { AuthService } from '../auth/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
})
export class HeaderComponent implements OnInit, OnDestroy {
  isAuthenticated = false;
  private userSub!: Subscription;
  constructor(
    private dataStorageService: DataStorageService,
    private authservice: AuthService
  ) {}
  ngOnDestroy(): void {
    this.userSub.unsubscribe();
  }
  ngOnInit() {
    this.userSub = this.authservice.user.subscribe((user) => {
      this.isAuthenticated = !!user;
    });
  }
  collapsed = true;
  @Output() featureSelected = new EventEmitter<string>();
  onSelect(feature: string) {
    this.featureSelected.emit(feature);
  }

  onSaveResipes() {
    this.dataStorageService.storeRecipes();
  }
  onFetchRecipes() {
    this.dataStorageService.fetchRecipes();
  }
}
