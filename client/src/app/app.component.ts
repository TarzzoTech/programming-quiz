import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from './services/auth.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent  implements OnInit, OnDestroy {

  isAdmin = false;
  roleSyncSubscription: Subscription;

  constructor(
    private auth: AuthService,
    private router: Router,
  ) {}

  ngOnInit() {
    this.roleSyncSubscription = this.auth.roleSync.subscribe((isAdmin: boolean) => {
      this.isAdmin = isAdmin;
    });
  }

  addQuestions() {
    this.router.navigate(['/data-entry']);
  }

  goToTrash() {
    this.router.navigate(['/trash']);
  }

  ngOnDestroy() {
    this.roleSyncSubscription.unsubscribe();
  }
}
