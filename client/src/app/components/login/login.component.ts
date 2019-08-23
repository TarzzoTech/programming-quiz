import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { AuthService } from 'src/app/services/auth.service';
import { Role } from 'src/app/models';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  emailFormControl: FormControl;
  passwordFormControl: FormControl;
  showPasswordBlock = false;
  invalidPassword = false;
  constructor(
    private router: Router,
    private api: ApiService,
    private auth: AuthService
  ) {}

  ngOnInit() {
    this.emailFormControl = new FormControl('', [
      Validators.required,
      Validators.email
    ]);
    this.passwordFormControl = new FormControl('', [
      Validators.required,
      Validators.minLength(6)
    ]);
  }

  emailSubmit() {
    if (this.emailFormControl.status === 'VALID') {
      this.showPasswordBlock = this.api.validateEmail(
        this.emailFormControl.value
      );
      if (!this.showPasswordBlock) {
        this.auth.setRole(Role.USER);
        this.router.navigate(['/quiz']);
      }
    }
  }

  passwordSubmit() {
    if (this.passwordFormControl.status === 'VALID') {
      if (this.api.validatePwd(this.passwordFormControl.value)) {
        this.auth.setRole(Role.ADMIN);
        this.router.navigate(['/marks-dashboard']);
      }
    }
  }
}
