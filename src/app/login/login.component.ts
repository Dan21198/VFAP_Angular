import { Component } from '@angular/core';
import {FormsModule} from "@angular/forms";
import { OldAuthService } from '../service/old.auth.service';
import { Router } from '@angular/router';
import {NoteService} from "../service/note.service";
import {TagService} from "../service/tag.service";
import {UserService} from "../service/user.service";
import {AuthService} from "../service/auth.service";

@Component({
  selector: 'app-login',
  standalone: true,
    imports: [
        FormsModule
    ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  loginEmail: string = '';
  loginPassword: string = '';
  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  login() {
    this.authService.login({
      email: this.loginEmail,
      password: this.loginPassword
    }).subscribe(response => {
      console.log('User logged in successfully:', response);
      this.router.navigate(['/notes']);
    }, error => {
      console.error('Login failed:', error);
    });
  }

  navigateToRegistration() {
    this.router.navigate(['/registration']);
  }
}
