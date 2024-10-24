import { Component } from '@angular/core';
import {AuthentificationService} from "../../services/authentification.service";
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username: string = '';
  password: string = '';

  constructor(private authService: AuthentificationService, private router: Router) {}

  login() {
    this.authService.login(this.username, this.password).subscribe(
      (response: any) => {
        localStorage.setItem('token', response.key);
        this.router.navigate(['/cinema']); // Redirige vers une route protégée
      },
      (error) => {
        console.error('Erreur de connexion', error, this.username, this.password);
      }
    );
  }
}
